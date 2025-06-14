import { Request, Response } from 'express';
import { aiMediaStudio } from './aimediaStudio-integration';
import { copyrightSystem } from './copyright-protection-system';
import { storage } from './storage';
import { securityBlockingSystem } from './agent-detection';

// Create new media project
export async function createMediaProject(req: Request, res: Response) {
  try {
    const { name, type, template_id, metadata, export_settings } = req.body;
    const creator = req.headers['x-user-email'] as string || 'anonymous';
    
    const userAgent = req.get('User-Agent') || '';
    const ip = req.ip || req.connection.remoteAddress || '';
    
    if (securityBlockingSystem.detectSuspiciousActivity(userAgent, ip)) {
      await storage.logSecurityEvent({
        projectId: null,
        suspicious_user: ip,
        action: 'unauthorized_media_project_creation',
        ip_address: ip,
        user_agent: userAgent,
        severity: 'medium',
        blocked: true
      });
      return res.status(403).json({ error: 'Access denied due to suspicious activity' });
    }

    let project;
    
    if (template_id) {
      project = aiMediaStudio.createFromTemplate(template_id, creator, { name, metadata, export_settings });
    } else {
      project = aiMediaStudio.createProject({ name, type, metadata, export_settings }, creator);
    }

    // Store in main project system
    const systemProject = await storage.createProject({
      title: project.name,
      type: 'enhanced',
      content: JSON.stringify({
        media_project_id: project.id,
        project_type: project.type,
        timeline_layers: project.timeline.length,
        assets_count: project.assets.length
      }),
      settings: JSON.stringify({
        aimediaStudio_integration: true,
        media_studio_version: '1.0',
        collaboration_enabled: project.collaboration.real_time_sync
      }),
      status: 'completed'
    });

    res.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        type: project.type,
        status: project.status,
        metadata: project.metadata,
        collaboration: project.collaboration,
        created_at: project.created_at
      },
      system_project: systemProject,
      capabilities: {
        timeline_editing: true,
        real_time_collaboration: true,
        ai_effects: true,
        professional_export: true,
        copyright_protection: true
      }
    });

  } catch (error) {
    console.error('Create media project error:', error);
    res.status(500).json({ 
      error: 'Failed to create media project',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Import media asset
export async function importMediaAsset(req: Request, res: Response) {
  try {
    const { project_id } = req.params;
    const { name, type, url, file_size, format, metadata } = req.body;
    
    const asset = aiMediaStudio.importAsset({
      name, type, url, file_size, format, metadata
    }, project_id);

    // Verify copyright status
    const copyrightCheck = copyrightSystem.verifyContentAuthenticity(asset.url || asset.name);

    res.json({
      success: true,
      asset: {
        id: asset.id,
        name: asset.name,
        type: asset.type,
        format: asset.format,
        file_size: asset.file_size,
        copyright_status: asset.copyright_status,
        usage_rights: asset.usage_rights
      },
      copyright_verification: copyrightCheck,
      import_timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Import media asset error:', error);
    res.status(500).json({ 
      error: 'Failed to import media asset',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Add timeline layer
export async function addTimelineLayer(req: Request, res: Response) {
  try {
    const { project_id } = req.params;
    const { name, type, start_time, duration, position, properties } = req.body;
    
    const layer = aiMediaStudio.addTimelineLayer(project_id, {
      name, type, start_time, duration, position, properties
    });

    res.json({
      success: true,
      layer: {
        id: layer.id,
        name: layer.name,
        type: layer.type,
        start_time: layer.start_time,
        duration: layer.duration,
        position: layer.position,
        visible: layer.visible,
        locked: layer.locked
      },
      timeline_updated: true
    });

  } catch (error) {
    console.error('Add timeline layer error:', error);
    res.status(500).json({ 
      error: 'Failed to add timeline layer',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Apply effect to layer
export async function applyEffect(req: Request, res: Response) {
  try {
    const { project_id, layer_id } = req.params;
    const { effect_id, parameters } = req.body;
    
    const success = aiMediaStudio.applyEffect(project_id, layer_id, effect_id, parameters);
    
    if (!success) {
      return res.status(404).json({ error: 'Project, layer, or effect not found' });
    }

    res.json({
      success: true,
      effect_applied: true,
      project_id,
      layer_id,
      effect_id,
      parameters_applied: Object.keys(parameters || {}).length
    });

  } catch (error) {
    console.error('Apply effect error:', error);
    res.status(500).json({ 
      error: 'Failed to apply effect',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Start render job
export async function startRender(req: Request, res: Response) {
  try {
    const { project_id } = req.params;
    const { export_settings } = req.body;
    
    const renderJob = aiMediaStudio.startRender(project_id, export_settings);

    // Log render start
    await storage.createMessage({
      projectId: null,
      sender: 'Media Studio',
      content: `Render job started: ${renderJob.id} for project ${project_id}`,
      messageType: 'system'
    });

    res.json({
      success: true,
      render_job: {
        id: renderJob.id,
        status: renderJob.status,
        progress: renderJob.progress,
        total_frames: renderJob.total_frames,
        estimated_time: renderJob.estimated_time_remaining,
        started_at: renderJob.started_at
      },
      render_settings: renderJob.render_settings
    });

  } catch (error) {
    console.error('Start render error:', error);
    res.status(500).json({ 
      error: 'Failed to start render',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get render job status
export async function getRenderStatus(req: Request, res: Response) {
  try {
    const { job_id } = req.params;
    
    const renderJob = aiMediaStudio.getRenderJob(job_id);
    
    if (!renderJob) {
      return res.status(404).json({ error: 'Render job not found' });
    }

    res.json({
      success: true,
      render_job: {
        id: renderJob.id,
        status: renderJob.status,
        progress: renderJob.progress,
        current_frame: renderJob.current_frame,
        total_frames: renderJob.total_frames,
        estimated_time_remaining: renderJob.estimated_time_remaining,
        started_at: renderJob.started_at,
        completed_at: renderJob.completed_at,
        output_files: renderJob.output_files,
        quality_metrics: renderJob.status === 'completed' ? renderJob.quality_metrics : null
      }
    });

  } catch (error) {
    console.error('Get render status error:', error);
    res.status(500).json({ 
      error: 'Failed to get render status',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// List available effects
export async function listEffects(req: Request, res: Response) {
  try {
    const { category } = req.query;
    
    const effects = aiMediaStudio.listEffects(category as string);
    
    res.json({
      success: true,
      effects: effects.map(effect => ({
        id: effect.id,
        name: effect.name,
        type: effect.type,
        category: effect.category,
        ai_powered: effect.ai_powered,
        gpu_accelerated: effect.gpu_accelerated,
        presets: effect.presets.map(preset => ({
          name: preset.name,
          description: preset.description
        }))
      })),
      total_effects: effects.length,
      categories: [...new Set(effects.map(e => e.category))]
    });

  } catch (error) {
    console.error('List effects error:', error);
    res.status(500).json({ 
      error: 'Failed to list effects',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// List project templates
export async function listTemplates(req: Request, res: Response) {
  try {
    const templates = aiMediaStudio.listTemplates();
    
    res.json({
      success: true,
      templates: templates.map(template => ({
        id: template.id,
        name: template.name,
        type: template.type,
        description: template.metadata.description,
        resolution: template.metadata.resolution,
        duration: template.metadata.duration,
        frame_rate: template.metadata.frame_rate,
        layer_count: template.timeline.length
      })),
      total_templates: templates.length
    });

  } catch (error) {
    console.error('List templates error:', error);
    res.status(500).json({ 
      error: 'Failed to list templates',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get project details
export async function getMediaProject(req: Request, res: Response) {
  try {
    const { project_id } = req.params;
    
    const project = aiMediaStudio.getProject(project_id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      project: {
        id: project.id,
        name: project.name,
        type: project.type,
        status: project.status,
        metadata: project.metadata,
        timeline: project.timeline.map(layer => ({
          id: layer.id,
          name: layer.name,
          type: layer.type,
          start_time: layer.start_time,
          duration: layer.duration,
          visible: layer.visible,
          locked: layer.locked
        })),
        assets: project.assets.map(asset => ({
          id: asset.id,
          name: asset.name,
          type: asset.type,
          format: asset.format,
          copyright_status: asset.copyright_status
        })),
        collaboration: project.collaboration,
        export_settings: project.export_settings,
        created_at: project.created_at,
        updated_at: project.updated_at
      }
    });

  } catch (error) {
    console.error('Get media project error:', error);
    res.status(500).json({ 
      error: 'Failed to get project details',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// List user projects
export async function listMediaProjects(req: Request, res: Response) {
  try {
    const creator = req.headers['x-user-email'] as string;
    
    const projects = aiMediaStudio.listProjects(creator);
    
    res.json({
      success: true,
      projects: projects.map(project => ({
        id: project.id,
        name: project.name,
        type: project.type,
        status: project.status,
        duration: project.metadata.duration,
        resolution: project.metadata.resolution,
        created_at: project.created_at,
        updated_at: project.updated_at,
        layer_count: project.timeline.length,
        asset_count: project.assets.length
      })),
      total_projects: projects.length
    });

  } catch (error) {
    console.error('List media projects error:', error);
    res.status(500).json({ 
      error: 'Failed to list projects',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Export project data
export async function exportProjectData(req: Request, res: Response) {
  try {
    const { project_id } = req.params;
    
    const projectData = aiMediaStudio.exportProjectData(project_id);
    
    res.json({
      success: true,
      export_data: projectData,
      export_format: 'json',
      exported_at: new Date().toISOString(),
      file_name: `${projectData.project.name}_export_${Date.now()}.json`
    });

  } catch (error) {
    console.error('Export project data error:', error);
    res.status(500).json({ 
      error: 'Failed to export project data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Import project data
export async function importProjectData(req: Request, res: Response) {
  try {
    const { project_data } = req.body;
    const creator = req.headers['x-user-email'] as string || 'anonymous';
    
    const project = aiMediaStudio.importProjectData(project_data, creator);
    
    res.json({
      success: true,
      imported_project: {
        id: project.id,
        name: project.name,
        type: project.type,
        imported_at: new Date().toISOString()
      },
      assets_imported: project.assets.length,
      layers_imported: project.timeline.length
    });

  } catch (error) {
    console.error('Import project data error:', error);
    res.status(500).json({ 
      error: 'Failed to import project data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Copyright protection routes
export async function registerContentCopyright(req: Request, res: Response) {
  try {
    const { content, content_type } = req.body;
    const creator = req.headers['x-user-email'] as string || 'anonymous';
    
    const copyrightRecord = copyrightSystem.registerCopyright(content, creator, content_type);
    
    res.json({
      success: true,
      copyright_record: {
        id: copyrightRecord.id,
        content_hash: copyrightRecord.content_hash,
        creator: copyrightRecord.creator,
        creation_date: copyrightRecord.creation_date,
        content_type: copyrightRecord.content_type,
        protection_level: copyrightRecord.protection_level,
        license_type: copyrightRecord.license_type
      },
      blockchain_proof: copyrightSystem.generateBlockchainProof(copyrightRecord),
      protection_active: true
    });

  } catch (error) {
    console.error('Register copyright error:', error);
    res.status(500).json({ 
      error: 'Failed to register copyright',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Scan for copyright infringement
export async function scanForInfringement(req: Request, res: Response) {
  try {
    const { content, content_type } = req.body;
    
    const alerts = copyrightSystem.scanForInfringement(content, content_type);
    
    res.json({
      success: true,
      scan_results: {
        alerts_found: alerts.length,
        highest_confidence: alerts.length > 0 ? Math.max(...alerts.map(a => a.confidence_score)) : 0,
        potential_infringements: alerts.map(alert => ({
          id: alert.id,
          alert_type: alert.alert_type,
          confidence_score: alert.confidence_score,
          platform: alert.detected_content.platform,
          similarity_score: alert.detected_content.similarity_score
        }))
      },
      content_verification: copyrightSystem.verifyContentAuthenticity(content),
      scan_timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Scan for infringement error:', error);
    res.status(500).json({ 
      error: 'Failed to scan for infringement',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get surveillance alerts
export async function getSurveillanceAlerts(req: Request, res: Response) {
  try {
    const { status } = req.query;
    
    const alerts = copyrightSystem.getSurveillanceAlerts(status as any);
    
    res.json({
      success: true,
      alerts: alerts.map(alert => ({
        id: alert.id,
        alert_type: alert.alert_type,
        confidence_score: alert.confidence_score,
        platform: alert.detected_content.platform,
        url: alert.detected_content.url,
        status: alert.status,
        created_date: alert.created_date
      })),
      total_alerts: alerts.length,
      active_alerts: alerts.filter(a => a.status === 'new').length
    });

  } catch (error) {
    console.error('Get surveillance alerts error:', error);
    res.status(500).json({ 
      error: 'Failed to get surveillance alerts',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}