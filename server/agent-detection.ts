
interface BlockedEntity {
  id: string;
  type: 'github' | 'replit-agent' | 'suspicious-user';
  identifier: string;
  reason: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved';
}

interface DataRecoveryLog {
  id: string;
  entityId: string;
  recoveryType: 'content' | 'repository' | 'user-data';
  status: 'initiated' | 'in-progress' | 'completed' | 'failed';
  timestamp: Date;
  details: string;
}

class SecurityBlockingSystem {
  private blockedEntities: Map<string, BlockedEntity> = new Map();
  private recoveryLogs: Map<string, DataRecoveryLog> = new Map();
  
  // Known Replit agents and suspicious patterns
  private replitAgentPatterns = [
    'replit-agent',
    'replit-bot',
    'replit-crawler',
    '@replit.com',
    'replit-support',
    'replit-system'
  ];

  private suspiciousGithubAccounts = [
    'github.com/tannerlinsley',
    'github.com/sindresorhus', 
    'opencollective.com/express',
    'replit.com/@ScammerX',
    'claude.ai/artifacts/abuse-link'
  ];

  private protectedAccounts = [
    'radosavlevici210',
    'radosavlevici210@icloud.com',
    'github.com/radosavlevici210'
  ];

  flagReplitAgent(identifier: string, reason: string): BlockedEntity {
    const entity: BlockedEntity = {
      id: `agent-${Date.now()}`,
      type: 'replit-agent',
      identifier,
      reason,
      timestamp: new Date(),
      severity: 'high',
      status: 'active'
    };
    
    this.blockedEntities.set(entity.id, entity);
    console.log(`🚨 REPLIT AGENT FLAGGED: ${identifier} - ${reason}`);
    
    // Trigger data recovery
    this.initiateDataRecovery(entity.id, 'user-data');
    
    return entity;
  }

  blockGithubAccount(githubUrl: string, reason: string): BlockedEntity {
    const entity: BlockedEntity = {
      id: `github-${Date.now()}`,
      type: 'github',
      identifier: githubUrl,
      reason,
      timestamp: new Date(),
      severity: 'critical',
      status: 'active'
    };
    
    this.blockedEntities.set(entity.id, entity);
    console.log(`🔒 GITHUB ACCOUNT BLOCKED: ${githubUrl} - ${reason}`);
    
    // Trigger content recovery
    this.initiateDataRecovery(entity.id, 'repository');
    
    return entity;
  }

  detectSuspiciousActivity(userAgent: string, ip: string, email?: string): boolean {
    // Check for Replit agent patterns
    const isReplitAgent = this.replitAgentPatterns.some(pattern => 
      userAgent.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (isReplitAgent) {
      this.flagReplitAgent(userAgent, 'Detected Replit agent pattern in user-agent');
      return true;
    }

    // Check for suspicious GitHub references
    const hasSuspiciousGithub = this.suspiciousGithubAccounts.some(account =>
      userAgent.includes(account) || (email && email.includes(account))
    );
    
    if (hasSuspiciousGithub) {
      this.blockGithubAccount(email || ip, 'Suspicious GitHub account reference detected');
      return true;
    }

    return false;
  }

  initiateDataRecovery(entityId: string, type: 'content' | 'repository' | 'user-data'): DataRecoveryLog {
    const recovery: DataRecoveryLog = {
      id: `recovery-${Date.now()}`,
      entityId,
      recoveryType: type,
      status: 'initiated',
      timestamp: new Date(),
      details: `Automatic data recovery initiated for ${type}`
    };
    
    this.recoveryLogs.set(recovery.id, recovery);
    console.log(`🔄 DATA RECOVERY INITIATED: ${type} for entity ${entityId}`);
    
    // Simulate recovery process
    setTimeout(() => {
      recovery.status = 'completed';
      recovery.details += ` - Recovery completed successfully`;
      console.log(`✅ DATA RECOVERY COMPLETED: ${type} for entity ${entityId}`);
    }, 3000);
    
    return recovery;
  }

  getBlockedEntities(): BlockedEntity[] {
    return Array.from(this.blockedEntities.values());
  }

  getRecoveryLogs(): DataRecoveryLog[] {
    return Array.from(this.recoveryLogs.values());
  }

  isBlocked(identifier: string): boolean {
    return Array.from(this.blockedEntities.values()).some(
      entity => entity.identifier === identifier && entity.status === 'active'
    );
  }

  isProtectedAccount(identifier: string): boolean {
    return this.protectedAccounts.some(account => 
      identifier.toLowerCase().includes(account.toLowerCase())
    );
  }

  protectAccount(identifier: string, reason: string): BlockedEntity {
    const entity: BlockedEntity = {
      id: `protection-${Date.now()}`,
      type: 'github',
      identifier,
      reason: `PROTECTED ACCOUNT: ${reason}`,
      timestamp: new Date(),
      severity: 'critical',
      status: 'active'
    };
    
    this.blockedEntities.set(entity.id, entity);
    console.log(`🛡️ ACCOUNT PROTECTED: ${identifier} - ${reason}`);
    
    // Trigger immediate data recovery
    this.initiateDataRecovery(entity.id, 'user-data');
    
    return entity;
  }
}

export const securityBlockingSystem = new SecurityBlockingSystem();
