export interface DashboardStats {
  safeDependencies: number;
  riskAlerts: number;
  criticalFailures: number;
  aiInsights: number;
}

export interface AuditStatus {
  complianceScore: number;
  approved: number;
  warnings: number;
  critical: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
}

export interface DependencyAudit {
  name: string;
  version: string;
  status: 'healthy' | 'warning' | 'critical';
  lastCheck: string;
}

export interface AIInsight {
  title: string;
  description: string;
}

export interface DashboardData {
  stats: DashboardStats;
  auditStatus: AuditStatus;
  recentAlerts: Alert[];
  analyzedDependencies: DependencyAudit[];
  latestInsight: AIInsight;
  user: {
    name: string;
    avatar: string;
    plan: 'Pro' | 'Free';
    usage: {
      current: number;
      limit: number;
    }
  }
}

export interface DashboardService {
  getDashboardData(): Promise<DashboardData>;
}
