import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Users, 
  Shield, 
  Settings,
  BarChart3,
  DollarSign,
  TrendingUp,
  Globe,
  Lock,
  CheckCircle,
  AlertTriangle,
  Crown,
  Zap,
  Database,
  Cloud,
  Server,
  Monitor,
  UserCheck,
  FileText,
  Calendar,
  Clock,
  Target
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import GradientCard from "./ui/gradient-card";

interface Organization {
  id: string;
  name: string;
  domain: string;
  plan: 'starter' | 'professional' | 'enterprise' | 'custom';
  users: number;
  maxUsers: number;
  storage: number;
  maxStorage: number;
  features: string[];
  status: 'active' | 'suspended' | 'trial';
  createdAt: Date;
  billingCycle: 'monthly' | 'yearly';
  nextBilling: Date;
}

interface EnterpriseMetrics {
  totalOrganizations: number;
  activeUsers: number;
  totalRevenue: number;
  growthRate: number;
  systemUptime: number;
  supportTickets: number;
  securityIncidents: number;
  apiCalls: number;
}

interface LicenseInfo {
  type: 'enterprise' | 'custom';
  features: string[];
  limits: {
    users: number;
    storage: number;
    apiCalls: number;
    bandwidth: number;
  };
  support: 'basic' | 'premium' | 'dedicated';
  sla: string;
}

export default function EnterpriseManagement() {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const { toast } = useToast();

  // Mock enterprise data - in production, this would come from your enterprise API
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'TechCorp Industries',
      domain: 'techcorp.com',
      plan: 'enterprise',
      users: 450,
      maxUsers: 500,
      storage: 2.3,
      maxStorage: 5.0,
      features: ['SSO', 'Advanced Analytics', 'Priority Support', 'Custom Branding'],
      status: 'active',
      createdAt: new Date('2023-01-15'),
      billingCycle: 'yearly',
      nextBilling: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Creative Studios Pro',
      domain: 'creativestudios.io',
      plan: 'professional',
      users: 85,
      maxUsers: 100,
      storage: 1.2,
      maxStorage: 2.0,
      features: ['Team Collaboration', 'Advanced Export', 'Analytics'],
      status: 'active',
      createdAt: new Date('2023-06-20'),
      billingCycle: 'monthly',
      nextBilling: new Date('2024-02-20')
    },
    {
      id: '3',
      name: 'StartupX',
      domain: 'startupx.dev',
      plan: 'starter',
      users: 12,
      maxUsers: 25,
      storage: 0.3,
      maxStorage: 0.5,
      features: ['Basic Features', 'Community Support'],
      status: 'trial',
      createdAt: new Date('2024-01-01'),
      billingCycle: 'monthly',
      nextBilling: new Date('2024-02-01')
    }
  ];

  const enterpriseMetrics: EnterpriseMetrics = {
    totalOrganizations: 156,
    activeUsers: 12847,
    totalRevenue: 2847500,
    growthRate: 23.5,
    systemUptime: 99.97,
    supportTickets: 23,
    securityIncidents: 0,
    apiCalls: 1250000
  };

  const licenseInfo: LicenseInfo = {
    type: 'enterprise',
    features: [
      'Unlimited Projects',
      'Advanced AI Models',
      'Enterprise SSO',
      'Custom Branding',
      'Priority Support',
      'Advanced Analytics',
      'API Access',
      'White-label Solutions',
      'Dedicated Infrastructure',
      'Compliance Tools'
    ],
    limits: {
      users: 10000,
      storage: 1000, // GB
      apiCalls: 10000000,
      bandwidth: 10000 // GB
    },
    support: 'dedicated',
    sla: '99.9% uptime guarantee'
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || org.plan === filterPlan;
    const matchesStatus = filterStatus === 'all' || org.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'professional': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'enterprise': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'custom': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'trial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'suspended': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent">
              Enterprise Management Console
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive enterprise administration and analytics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              <Crown className="w-3 h-3 mr-1" />
              Enterprise License
            </Badge>
          </div>
        </div>

        {/* Enterprise Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GradientCard
            title="Total Organizations"
            gradient="primary"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {enterpriseMetrics.totalOrganizations}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Building2 className="w-4 h-4 mr-1" />
                Active Enterprises
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Active Users"
            gradient="success"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {formatNumber(enterpriseMetrics.activeUsers)}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-1" />
                Across all orgs
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Monthly Revenue"
            gradient="accent"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">
                {formatCurrency(enterpriseMetrics.totalRevenue)}
              </div>
              <div className="flex items-center justify-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{enterpriseMetrics.growthRate}% growth
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="System Status"
            gradient="warning"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                {enterpriseMetrics.systemUptime}%
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Server className="w-4 h-4 mr-1" />
                Uptime
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="organizations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card border">
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="license" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              License
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="organizations" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4">
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Organizations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredOrganizations.map((org) => (
                <Card key={org.id} className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getPlanColor(org.plan)}>
                          {org.plan}
                        </Badge>
                        <Badge className={getStatusColor(org.status)}>
                          {org.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{org.domain}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Users:</span>
                        <div className="font-medium">{org.users} / {org.maxUsers}</div>
                        <Progress value={(org.users / org.maxUsers) * 100} className="h-2 mt-1" />
                      </div>
                      <div>
                        <span className="text-muted-foreground">Storage:</span>
                        <div className="font-medium">{org.storage}GB / {org.maxStorage}GB</div>
                        <Progress value={(org.storage / org.maxStorage) * 100} className="h-2 mt-1" />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {org.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {org.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{org.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Billing:</span>
                      <span>{org.nextBilling.toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedOrg(org)}
                        className="flex-1"
                        size="sm"
                      >
                        <Monitor className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GradientCard
                title="Revenue Analytics"
                gradient="primary"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Recurring Revenue</span>
                    <span className="font-medium text-2xl">
                      {formatCurrency(enterpriseMetrics.totalRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Growth Rate</span>
                    <span className="font-medium text-green-400">
                      +{enterpriseMetrics.growthRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Revenue Per User</span>
                    <span className="font-medium">
                      {formatCurrency(enterpriseMetrics.totalRevenue / enterpriseMetrics.activeUsers)}
                    </span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Usage Metrics"
                gradient="accent"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Calls (Monthly)</span>
                    <span className="font-medium">
                      {formatNumber(enterpriseMetrics.apiCalls)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Organizations</span>
                    <span className="font-medium">
                      {enterpriseMetrics.totalOrganizations}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support Tickets</span>
                    <span className="font-medium">
                      {enterpriseMetrics.supportTickets}
                    </span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="System Health"
                gradient="success"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Uptime</span>
                    <span className="font-medium text-green-400">
                      {enterpriseMetrics.systemUptime}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Incidents</span>
                    <span className="font-medium">
                      {enterpriseMetrics.securityIncidents}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="font-medium">
                      &lt;50ms
                    </span>
                  </div>
                </div>
              </GradientCard>
            </div>
          </TabsContent>

          <TabsContent value="license" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GradientCard
                title="Enterprise License"
                gradient="primary"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium text-lg">{licenseInfo.type.toUpperCase()} LICENSE</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Support Level:</span>
                      <Badge variant="outline">{licenseInfo.support}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">SLA:</span>
                      <span className="text-sm font-medium">{licenseInfo.sla}</span>
                    </div>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Usage Limits"
                gradient="secondary"
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Max Users:</span>
                    <span className="font-medium">{formatNumber(licenseInfo.limits.users)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Storage:</span>
                    <span className="font-medium">{licenseInfo.limits.storage}GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">API Calls:</span>
                    <span className="font-medium">{formatNumber(licenseInfo.limits.apiCalls)}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bandwidth:</span>
                    <span className="font-medium">{formatNumber(licenseInfo.limits.bandwidth)}GB/month</span>
                  </div>
                </div>
              </GradientCard>
            </div>

            <GradientCard
              title="Enterprise Features"
              gradient="accent"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {licenseInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </GradientCard>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GradientCard
                title="Security Overview"
                gradient="error"
                glowEffect={enterpriseMetrics.securityIncidents > 0}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Incidents</span>
                    <div className="flex items-center gap-2">
                      {enterpriseMetrics.securityIncidents === 0 ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      )}
                      <span className="font-medium">{enterpriseMetrics.securityIncidents}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Failed Login Attempts</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Scans</span>
                    <span className="font-medium text-green-400">Passed</span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Compliance Status"
                gradient="success"
                glowEffect={true}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SOC 2 Type II</span>
                    <Badge className="bg-green-500/20 text-green-400">Certified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR Compliance</span>
                    <Badge className="bg-green-500/20 text-green-400">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ISO 27001</span>
                    <Badge className="bg-green-500/20 text-green-400">Certified</Badge>
                  </div>
                </div>
              </GradientCard>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <GradientCard
              title="Enterprise Configuration"
              gradient="primary"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Enterprise Domain</Label>
                    <Input
                      id="domain"
                      placeholder="yourdomain.com"
                      defaultValue="enterprise.yourcompany.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sso">SSO Configuration</Label>
                    <Select defaultValue="saml">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saml">SAML 2.0</SelectItem>
                        <SelectItem value="oauth">OAuth 2.0</SelectItem>
                        <SelectItem value="oidc">OpenID Connect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branding">Custom Branding</Label>
                  <Textarea
                    id="branding"
                    placeholder="Upload your logo and customize the interface..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                </div>
              </div>
            </GradientCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}