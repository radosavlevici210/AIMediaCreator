import { Request, Response } from 'express';
import { difyIntegration } from './dify-integration';
import { prefectIntegration } from './prefect-integration';
import { storage } from './storage';
import { securityBlockingSystem } from './agent-detection';

// Dify workflow execution
export async function executeDifyWorkflow(req: Request, res: Response) {
  try {
    const { workflow_id, inputs } = req.body;
    
    const userAgent = req.get('User-Agent') || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    
    if (securityBlockingSystem.detectSuspiciousActivity(userAgent, ip)) {
      await storage.logSecurityEvent({
        projectId: null,
        suspicious_user: ip,
        action: 'unauthorized_workflow_access',
        ip_address: ip,
        user_agent: userAgent,
        severity: 'high',
        blocked: true
      });
      return res.status(403).json({ error: 'Access denied due to suspicious activity' });
    }

    const execution = await difyIntegration.executeWorkflow(workflow_id, inputs);

    // Store execution in project system
    const project = await storage.createProject({
      title: `Dify Workflow: ${workflow_id}`,
      type: 'enhanced',
      content: JSON.stringify({
        workflow_id,
        inputs,
        execution_details: execution
      }),
      settings: JSON.stringify({
        workflow_orchestration: true,
        dify_integration: true,
        execution_id: execution.id
      }),
      status: execution.status === 'completed' ? 'completed' : 'processing',
      resultUrl: execution.status === 'completed' ? `/api/workflows/dify/${execution.id}/result` : null
    });

    res.json({
      success: true,
      execution,
      project,
      metadata: {
        execution_time: execution.completed_at ? 
          new Date(execution.completed_at).getTime() - new Date(execution.started_at).getTime() : null,
        workflow_type: 'dify',
        integration_version: '1.0'
      }
    });

  } catch (error) {
    console.error('Dify workflow execution error:', error);
    res.status(500).json({ 
      error: 'Workflow execution failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Prefect flow execution
export async function executePrefectFlow(req: Request, res: Response) {
  try {
    const { flow_id, parameters } = req.body;
    
    const userAgent = req.get('User-Agent') || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    
    if (securityBlockingSystem.detectSuspiciousActivity(userAgent, ip)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const flowRun = await prefectIntegration.executeFlow(flow_id, parameters);

    // Store flow run in project system
    const project = await storage.createProject({
      title: `Prefect Flow: ${flow_id}`,
      type: 'enhanced',
      content: JSON.stringify({
        flow_id,
        parameters,
        flow_run: {
          id: flowRun.id,
          status: flowRun.status,
          task_count: flowRun.task_runs.length
        }
      }),
      settings: JSON.stringify({
        workflow_orchestration: true,
        prefect_integration: true,
        flow_run_id: flowRun.id
      }),
      status: flowRun.status === 'completed' ? 'completed' : 'processing',
      resultUrl: flowRun.status === 'completed' ? `/api/workflows/prefect/${flowRun.id}/result` : null
    });

    res.json({
      success: true,
      flow_run: {
        id: flowRun.id,
        status: flowRun.status,
        start_time: flowRun.start_time,
        end_time: flowRun.end_time,
        task_runs: flowRun.task_runs.map(tr => ({
          id: tr.id,
          task_id: tr.task_id,
          status: tr.status,
          cache_hit: tr.cache_hit
        }))
      },
      project,
      metadata: {
        execution_time: flowRun.end_time ? 
          flowRun.end_time.getTime() - flowRun.start_time.getTime() : null,
        workflow_type: 'prefect',
        integration_version: '1.0'
      }
    });

  } catch (error) {
    console.error('Prefect flow execution error:', error);
    res.status(500).json({ 
      error: 'Flow execution failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Chat with Dify conversation app
export async function chatWithDifyApp(req: Request, res: Response) {
  try {
    const { app_id, message, conversation_id } = req.body;
    
    const response = await difyIntegration.chatWithApp(app_id, message, conversation_id);

    // Log conversation in project system
    await storage.createMessage({
      projectId: null,
      sender: 'Dify Assistant',
      content: `User: ${message}\nAssistant: ${response.answer}`,
      messageType: 'system'
    });

    res.json({
      success: true,
      response,
      metadata: {
        app_id,
        conversation_id: response.conversation_id,
        tokens_used: response.metadata.tokens_used,
        processing_time: response.metadata.processing_time
      }
    });

  } catch (error) {
    console.error('Dify chat error:', error);
    res.status(500).json({ 
      error: 'Chat failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Execute Dify agent
export async function executeDifyAgent(req: Request, res: Response) {
  try {
    const { agent_id, task } = req.body;
    
    const execution = await difyIntegration.executeAgent(agent_id, task);

    // Store agent execution result
    const project = await storage.createProject({
      title: `Agent Task: ${task.substring(0, 50)}...`,
      type: 'enhanced',
      content: JSON.stringify({
        agent_id,
        task,
        execution_details: execution
      }),
      settings: JSON.stringify({
        agent_execution: true,
        dify_integration: true,
        agent_tools: execution.tools_used
      }),
      status: 'completed',
      resultUrl: `/api/agents/dify/${execution.id}/result`
    });

    res.json({
      success: true,
      execution,
      project,
      metadata: {
        agent_type: 'dify',
        tools_used: execution.tools_used,
        reasoning_steps: execution.reasoning_steps.length
      }
    });

  } catch (error) {
    console.error('Dify agent execution error:', error);
    res.status(500).json({ 
      error: 'Agent execution failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// List available workflows and flows
export async function listWorkflowsAndFlows(req: Request, res: Response) {
  try {
    const difyWorkflows = difyIntegration.listWorkflows();
    const prefectFlows = prefectIntegration.listFlows();
    const difyApps = difyIntegration.listConversationApps();
    const difyAgents = difyIntegration.listAgentApps();

    res.json({
      success: true,
      workflows: {
        dify: difyWorkflows,
        prefect: prefectFlows
      },
      applications: {
        conversation_apps: difyApps,
        agent_apps: difyAgents
      },
      capabilities: {
        workflow_orchestration: true,
        agent_reasoning: true,
        conversation_ai: true,
        batch_processing: true,
        caching: true,
        monitoring: true
      }
    });

  } catch (error) {
    console.error('List workflows error:', error);
    res.status(500).json({ 
      error: 'Failed to list workflows',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get workflow/flow status
export async function getWorkflowStatus(req: Request, res: Response) {
  try {
    const { type, id } = req.params;
    
    let status;
    
    if (type === 'dify') {
      status = difyIntegration.getWorkflowStatus(id);
    } else if (type === 'prefect') {
      status = prefectIntegration.getFlowRun(id);
    } else {
      return res.status(400).json({ error: 'Invalid workflow type' });
    }

    if (!status) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json({
      success: true,
      status,
      type,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get workflow status error:', error);
    res.status(500).json({ 
      error: 'Failed to get workflow status',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Cancel running workflow
export async function cancelWorkflow(req: Request, res: Response) {
  try {
    const { type, id } = req.params;
    
    let cancelled = false;
    
    if (type === 'prefect') {
      cancelled = prefectIntegration.cancelFlowRun(id);
    } else {
      return res.status(400).json({ error: 'Cancellation not supported for this workflow type' });
    }

    if (!cancelled) {
      return res.status(404).json({ error: 'Workflow not found or not running' });
    }

    res.json({
      success: true,
      cancelled: true,
      workflow_id: id,
      cancelled_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Cancel workflow error:', error);
    res.status(500).json({ 
      error: 'Failed to cancel workflow',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Create Prefect deployment
export async function createPrefectDeployment(req: Request, res: Response) {
  try {
    const { flow_id, name, schedule } = req.body;
    
    const deployment = prefectIntegration.createDeployment(flow_id, name, schedule);

    res.json({
      success: true,
      deployment,
      metadata: {
        created_at: deployment.created_at,
        scheduled: !!deployment.schedule,
        next_run: deployment.next_run
      }
    });

  } catch (error) {
    console.error('Create deployment error:', error);
    res.status(500).json({ 
      error: 'Failed to create deployment',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get deployment status
export async function getDeploymentStatus(req: Request, res: Response) {
  try {
    const { deployment_id } = req.params;
    
    const deployment = prefectIntegration.getDeployment(deployment_id);
    
    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }

    res.json({
      success: true,
      deployment,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get deployment status error:', error);
    res.status(500).json({ 
      error: 'Failed to get deployment status',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// List all deployments
export async function listDeployments(req: Request, res: Response) {
  try {
    const deployments = prefectIntegration.listDeployments();

    res.json({
      success: true,
      deployments,
      count: deployments.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('List deployments error:', error);
    res.status(500).json({ 
      error: 'Failed to list deployments',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get workflow orchestration metrics
export async function getOrchestrationMetrics(req: Request, res: Response) {
  try {
    const prefectFlows = prefectIntegration.listFlowRuns();
    const difyWorkflows = difyIntegration.listWorkflows();

    const metrics = {
      total_workflows: difyWorkflows.length,
      total_flows: prefectIntegration.listFlows().length,
      total_executions: prefectFlows.length,
      successful_executions: prefectFlows.filter(run => run.status === 'completed').length,
      failed_executions: prefectFlows.filter(run => run.status === 'failed').length,
      running_executions: prefectFlows.filter(run => run.status === 'running').length,
      average_execution_time: this.calculateAverageExecutionTime(prefectFlows),
      success_rate: prefectFlows.length > 0 ? 
        (prefectFlows.filter(run => run.status === 'completed').length / prefectFlows.length * 100).toFixed(2) : 0,
      integrations: {
        dify: {
          workflows: difyWorkflows.length,
          conversation_apps: difyIntegration.listConversationApps().length,
          agent_apps: difyIntegration.listAgentApps().length
        },
        prefect: {
          flows: prefectIntegration.listFlows().length,
          deployments: prefectIntegration.listDeployments().length,
          active_runs: prefectFlows.filter(run => run.status === 'running').length
        }
      }
    };

    res.json({
      success: true,
      metrics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Get orchestration metrics error:', error);
    res.status(500).json({ 
      error: 'Failed to get orchestration metrics',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function calculateAverageExecutionTime(flowRuns: any[]): string {
  const completedRuns = flowRuns.filter(run => run.status === 'completed' && run.end_time);
  
  if (completedRuns.length === 0) return '0s';
  
  const totalTime = completedRuns.reduce((sum, run) => {
    return sum + (new Date(run.end_time).getTime() - new Date(run.start_time).getTime());
  }, 0);
  
  const avgTimeMs = totalTime / completedRuns.length;
  return `${(avgTimeMs / 1000).toFixed(1)}s`;
}