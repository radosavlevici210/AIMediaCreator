import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Key, 
  Users, 
  Settings,
  CheckCircle,
  AlertTriangle,
  Globe,
  Lock,
  FileText,
  Copy,
  Eye,
  EyeOff,
  Download,
  Upload,
  Zap,
  Building2,
  UserCheck,
  Database,
  Server
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GradientCard from "./ui/gradient-card";

interface SSOProvider {
  id: string;
  name: string;
  type: 'saml' | 'oauth' | 'oidc';
  status: 'active' | 'inactive' | 'testing';
  users: number;
  lastSync: Date;
  configuration: {
    entityId?: string;
    ssoUrl?: string;
    x509Certificate?: string;
    clientId?: string;
    clientSecret?: string;
    discoveryUrl?: string;
  };
}

interface SSOConfiguration {
  defaultProvider: string;
  autoProvisioning: boolean;
  enforceSSO: boolean;
  allowLocalAuth: boolean;
  sessionTimeout: number;
  attributeMapping: {
    email: string;
    firstName: string;
    lastName: string;
    department: string;
    role: string;
  };
}

export default function EnterpriseSSOIntegration() {
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [showSecrets, setShowSecrets] = useState(false);
  const [ssoConfig, setSSOConfig] = useState<SSOConfiguration>({
    defaultProvider: 'saml',
    autoProvisioning: true,
    enforceSSO: false,
    allowLocalAuth: true,
    sessionTimeout: 480,
    attributeMapping: {
      email: 'email',
      firstName: 'given_name',
      lastName: 'family_name',
      department: 'department',
      role: 'role'
    }
  });

  const { toast } = useToast();

  const ssoProviders: SSOProvider[] = [
    {
      id: '1',
      name: 'Microsoft Azure AD',
      type: 'saml',
      status: 'active',
      users: 1250,
      lastSync: new Date('2024-01-15T10:30:00'),
      configuration: {
        entityId: 'https://sts.windows.net/12345678-1234-1234-1234-123456789012/',
        ssoUrl: 'https://login.microsoftonline.com/12345678-1234-1234-1234-123456789012/saml2',
        x509Certificate: '-----BEGIN CERTIFICATE-----\nMIIC8DCCAdigAwIBAgIQMOBD...\n-----END CERTIFICATE-----'
      }
    },
    {
      id: '2', 
      name: 'Google Workspace',
      type: 'oauth',
      status: 'active',
      users: 850,
      lastSync: new Date('2024-01-15T09:15:00'),
      configuration: {
        clientId: '123456789012-abcdefghijklmnop.apps.googleusercontent.com',
        clientSecret: 'GOCSPX-abcdefghijklmnopqrstuvwxyz',
        discoveryUrl: 'https://accounts.google.com/.well-known/openid_configuration'
      }
    },
    {
      id: '3',
      name: 'Okta',
      type: 'oidc',
      status: 'testing',
      users: 0,
      lastSync: new Date('2024-01-14T16:45:00'),
      configuration: {
        clientId: 'okta_client_id_123',
        clientSecret: 'okta_client_secret_456',
        discoveryUrl: 'https://dev-123456.okta.com/.well-known/openid_configuration'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'testing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'inactive': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'saml': return <Shield className="w-4 h-4" />;
      case 'oauth': return <Key className="w-4 h-4" />;
      case 'oidc': return <Globe className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  const handleTestConnection = (provider: SSOProvider) => {
    toast({
      title: "Testing Connection",
      description: `Testing SSO configuration for ${provider.name}...`,
    });
    
    // Simulate test - in production, this would call your SSO test API
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `SSO connection to ${provider.name} is working correctly.`,
      });
    }, 2000);
  };

  const handleSaveConfiguration = () => {
    toast({
      title: "Configuration Saved",
      description: "SSO configuration has been updated successfully.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Configuration value has been copied.",
    });
  };

  const maskSecret = (secret: string) => {
    if (!secret) return '';
    return showSecrets ? secret : '*'.repeat(Math.min(secret.length, 20));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Enterprise SSO Integration
            </h1>
            <p className="text-muted-foreground mt-1">
              Single Sign-On configuration and identity provider management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Shield className="w-3 h-3 mr-1" />
              Enterprise Security
            </Badge>
          </div>
        </div>

        {/* SSO Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GradientCard
            title="Active Providers"
            gradient="success"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {ssoProviders.filter(p => p.status === 'active').length}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 mr-1" />
                Configured
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="SSO Users"
            gradient="primary"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {ssoProviders.reduce((sum, p) => sum + p.users, 0)}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-1" />
                Total Users
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Security Level"
            gradient="accent"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">
                A+
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Shield className="w-4 h-4 mr-1" />
                Grade
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Uptime"
            gradient="warning"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                99.9%
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Zap className="w-4 h-4 mr-1" />
                This Month
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="providers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card border">
            <TabsTrigger value="providers" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="configuration" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="attributes" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              User Mapping
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {ssoProviders.map((provider) => (
                <Card key={provider.id} className="backdrop-blur-sm bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(provider.type)}
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(provider.status)}>
                        {provider.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {provider.type.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {provider.users} users
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Last Sync:</span>
                      <div className="font-medium">
                        {provider.lastSync.toLocaleString()}
                      </div>
                    </div>

                    {provider.configuration && (
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Configuration:</div>
                        <div className="space-y-1 text-xs">
                          {provider.configuration.entityId && (
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Entity ID:</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(provider.configuration.entityId!)}
                                className="h-auto p-1"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                          {provider.configuration.clientId && (
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">Client ID:</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(provider.configuration.clientId!)}
                                className="h-auto p-1"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedProvider(provider)}
                        className="flex-1"
                        size="sm"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestConnection(provider)}
                      >
                        <Zap className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="backdrop-blur-sm bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle>Add New SSO Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Shield className="w-6 h-6" />
                    <span>SAML 2.0</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Key className="w-6 h-6" />
                    <span>OAuth 2.0</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Globe className="w-6 h-6" />
                    <span>OpenID Connect</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GradientCard
                title="General Settings"
                gradient="primary"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultProvider">Default SSO Provider</Label>
                    <Select value={ssoConfig.defaultProvider} onValueChange={(value) => setSSOConfig({...ssoConfig, defaultProvider: value})}>
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

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={ssoConfig.sessionTimeout}
                      onChange={(e) => setSSOConfig({...ssoConfig, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto User Provisioning</Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically create users on first login
                      </div>
                    </div>
                    <Switch
                      checked={ssoConfig.autoProvisioning}
                      onCheckedChange={(checked) => setSSOConfig({...ssoConfig, autoProvisioning: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enforce SSO</Label>
                      <div className="text-sm text-muted-foreground">
                        Require SSO for all users
                      </div>
                    </div>
                    <Switch
                      checked={ssoConfig.enforceSSO}
                      onCheckedChange={(checked) => setSSOConfig({...ssoConfig, enforceSSO: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Local Authentication</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow username/password login as fallback
                      </div>
                    </div>
                    <Switch
                      checked={ssoConfig.allowLocalAuth}
                      onCheckedChange={(checked) => setSSOConfig({...ssoConfig, allowLocalAuth: checked})}
                    />
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Security Settings"
                gradient="error"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption</span>
                    <Badge className="bg-green-500/20 text-green-400">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Certificate Validation</span>
                    <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Signature Algorithm</span>
                    <Badge className="bg-green-500/20 text-green-400">SHA-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SAML Assertions</span>
                    <Badge className="bg-green-500/20 text-green-400">Signed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Token Lifetime</span>
                    <span className="text-sm font-medium">8 hours</span>
                  </div>
                </div>
              </GradientCard>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSaveConfiguration} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Settings className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Settings
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <GradientCard
              title="User Attribute Mapping"
              gradient="accent"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emailMapping">Email Attribute</Label>
                    <Input
                      id="emailMapping"
                      value={ssoConfig.attributeMapping.email}
                      onChange={(e) => setSSOConfig({
                        ...ssoConfig,
                        attributeMapping: {...ssoConfig.attributeMapping, email: e.target.value}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstNameMapping">First Name Attribute</Label>
                    <Input
                      id="firstNameMapping"
                      value={ssoConfig.attributeMapping.firstName}
                      onChange={(e) => setSSOConfig({
                        ...ssoConfig,
                        attributeMapping: {...ssoConfig.attributeMapping, firstName: e.target.value}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastNameMapping">Last Name Attribute</Label>
                    <Input
                      id="lastNameMapping"
                      value={ssoConfig.attributeMapping.lastName}
                      onChange={(e) => setSSOConfig({
                        ...ssoConfig,
                        attributeMapping: {...ssoConfig.attributeMapping, lastName: e.target.value}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departmentMapping">Department Attribute</Label>
                    <Input
                      id="departmentMapping"
                      value={ssoConfig.attributeMapping.department}
                      onChange={(e) => setSSOConfig({
                        ...ssoConfig,
                        attributeMapping: {...ssoConfig.attributeMapping, department: e.target.value}
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roleMapping">Role Attribute</Label>
                    <Input
                      id="roleMapping"
                      value={ssoConfig.attributeMapping.role}
                      onChange={(e) => setSSOConfig({
                        ...ssoConfig,
                        attributeMapping: {...ssoConfig.attributeMapping, role: e.target.value}
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Role Mapping Rules</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                      <Input placeholder="SSO Role" className="flex-1" />
                      <span className="text-muted-foreground">→</span>
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="System Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </GradientCard>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GradientCard
                title="Authentication Security"
                gradient="error"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Multi-Factor Authentication</span>
                    <Badge className="bg-green-500/20 text-green-400">Required</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Policy</span>
                    <Badge className="bg-green-500/20 text-green-400">Enforced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Management</span>
                    <Badge className="bg-green-500/20 text-green-400">Secure</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Brute Force Protection</span>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Compliance & Audit"
                gradient="success"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SAML Compliance</span>
                    <Badge className="bg-green-500/20 text-green-400">SOC 2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Audit Logging</span>
                    <Badge className="bg-green-500/20 text-green-400">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Retention</span>
                    <span className="text-sm font-medium">90 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Encryption at Rest</span>
                    <Badge className="bg-green-500/20 text-green-400">AES-256</Badge>
                  </div>
                </div>
              </GradientCard>
            </div>

            <GradientCard
              title="Certificate Management"
              gradient="primary"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setShowSecrets(!showSecrets)}
                  >
                    {showSecrets ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showSecrets ? 'Hide' : 'Show'} Secrets
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>X.509 Certificate</Label>
                    <Textarea
                      value={maskSecret('-----BEGIN CERTIFICATE-----\nMIIC8DCCAdigAwIBAgIQMOBD...\n-----END CERTIFICATE-----')}
                      readOnly
                      className="mt-2 font-mono text-xs"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Private Key</Label>
                    <Textarea
                      value={maskSecret('-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0B...\n-----END PRIVATE KEY-----')}
                      readOnly
                      className="mt-2 font-mono text-xs"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Certificate
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Metadata
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