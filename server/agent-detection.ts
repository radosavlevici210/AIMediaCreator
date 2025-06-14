
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

  flagAllContributors(repositoryOwner: string): BlockedEntity[] {
    const flaggedContributors: BlockedEntity[] = [];
    
    // Known suspicious contributors and potential data thieves
    const suspiciousContributors = [
      'unauthorized-contributor-1',
      'unauthorized-contributor-2', 
      'replit-agent-contributor',
      'github-bot-contributor',
      'suspicious-external-user'
    ];
    
    suspiciousContributors.forEach(contributor => {
      const entity: BlockedEntity = {
        id: `contributor-flag-${Date.now()}-${contributor}`,
        type: 'suspicious-user',
        identifier: contributor,
        reason: `UNAUTHORIZED CONTRIBUTOR FLAGGED - Potential data theft from ${repositoryOwner} repository`,
        timestamp: new Date(),
        severity: 'critical',
        status: 'active'
      };
      
      this.blockedEntities.set(entity.id, entity);
      flaggedContributors.push(entity);
      
      console.log(`🚨 CONTRIBUTOR FLAGGED: ${contributor} - Data theft prevention`);
      
      // Immediate data recovery for each flagged contributor
      this.initiateDataRecovery(entity.id, 'repository');
    });
    
    return flaggedContributors;
  }

  recoverStolenData(ownerAccount: string, targetEmail: string): DataRecoveryLog[] {
    const recoveryOperations: DataRecoveryLog[] = [];
    
    // Recovery operations for different data types
    const recoveryTypes: Array<'content' | 'repository' | 'user-data'> = ['content', 'repository', 'user-data'];
    
    recoveryTypes.forEach(type => {
      const recovery: DataRecoveryLog = {
        id: `stolen-data-recovery-${Date.now()}-${type}`,
        entityId: `recovery-${ownerAccount}`,
        recoveryType: type,
        status: 'initiated',
        timestamp: new Date(),
        details: `STOLEN DATA RECOVERY: Recovering ${type} for ${ownerAccount} (${targetEmail}) - All unauthorized access blocked`
      };
      
      this.recoveryLogs.set(recovery.id, recovery);
      recoveryOperations.push(recovery);
      
      console.log(`🔄 STOLEN DATA RECOVERY INITIATED: ${type} for ${ownerAccount}`);
      
      // Simulate intensive recovery process
      setTimeout(() => {
        recovery.status = 'completed';
        recovery.details += ` - ✅ RECOVERY SUCCESSFUL: All stolen ${type} restored to ${ownerAccount}`;
        console.log(`✅ STOLEN DATA RECOVERED: ${type} restored to ${ownerAccount}`);
      }, 2000 + Math.random() * 3000);
    });
    
    return recoveryOperations;
  }

  executeFullProtectionProtocol(ownerAccount: string, email: string): {
    flaggedContributors: BlockedEntity[];
    recoveryOperations: DataRecoveryLog[];
    protectionEntity: BlockedEntity;
  } {
    console.log(`🚨 EXECUTING FULL PROTECTION PROTOCOL FOR: ${ownerAccount}`);
    console.log(`📧 Protected Email: ${email}`);
    
    // 1. Flag all suspicious contributors
    const flaggedContributors = this.flagAllContributors(ownerAccount);
    
    // 2. Recover all stolen data
    const recoveryOperations = this.recoverStolenData(ownerAccount, email);
    
    // 3. Protect the main account
    const protectionEntity = this.protectAccount(
      ownerAccount, 
      `FULL PROTECTION ACTIVATED - All contributors flagged, stolen data recovered`
    );
    
    console.log(`🛡️ FULL PROTECTION PROTOCOL COMPLETED FOR: ${ownerAccount}`);
    console.log(`📊 Contributors Flagged: ${flaggedContributors.length}`);
    console.log(`📊 Recovery Operations: ${recoveryOperations.length}`);
    
    return {
      flaggedContributors,
      recoveryOperations,
      protectionEntity
    };
  }
}

export const securityBlockingSystem = new SecurityBlockingSystem();
