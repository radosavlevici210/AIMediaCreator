import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  Building2,
  Users,
  Zap,
  Crown,
  Receipt,
  Calculator,
  PieChart,
  BarChart3
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import GradientCard from "./ui/gradient-card";

interface BillingData {
  organizationId: string;
  organizationName: string;
  plan: string;
  monthlyRevenue: number;
  yearlyRevenue: number;
  usage: {
    users: number;
    storage: number;
    apiCalls: number;
    bandwidth: number;
  };
  limits: {
    users: number;
    storage: number;
    apiCalls: number;
    bandwidth: number;
  };
  overage: {
    users: number;
    storage: number;
    apiCalls: number;
    bandwidth: number;
  };
  nextBilling: Date;
  invoices: Invoice[];
}

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: InvoiceItem[];
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface RevenueSummary {
  totalRevenue: number;
  monthlyRecurring: number;
  yearlyRecurring: number;
  growthRate: number;
  churnRate: number;
  averageRevenuePerUser: number;
}

export default function EnterpriseBillingSystem() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("monthly");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("all");

  // Mock billing data - in production, this would come from your billing API
  const billingData: BillingData[] = [
    {
      organizationId: '1',
      organizationName: 'TechCorp Industries',
      plan: 'Enterprise',
      monthlyRevenue: 15000,
      yearlyRevenue: 180000,
      usage: {
        users: 450,
        storage: 2300,
        apiCalls: 850000,
        bandwidth: 4500
      },
      limits: {
        users: 500,
        storage: 5000,
        apiCalls: 1000000,
        bandwidth: 10000
      },
      overage: {
        users: 0,
        storage: 0,
        apiCalls: 0,
        bandwidth: 0
      },
      nextBilling: new Date('2024-02-15'),
      invoices: [
        {
          id: 'INV-2024-001',
          date: new Date('2024-01-15'),
          amount: 15000,
          status: 'paid',
          items: [
            { description: 'Enterprise Plan - 500 Users', quantity: 1, rate: 15000, amount: 15000 }
          ]
        },
        {
          id: 'INV-2023-012',
          date: new Date('2023-12-15'),
          amount: 15000,
          status: 'paid',
          items: [
            { description: 'Enterprise Plan - 500 Users', quantity: 1, rate: 15000, amount: 15000 }
          ]
        }
      ]
    },
    {
      organizationId: '2',
      organizationName: 'Creative Studios Pro',
      plan: 'Professional',
      monthlyRevenue: 2500,
      yearlyRevenue: 30000,
      usage: {
        users: 85,
        storage: 1200,
        apiCalls: 150000,
        bandwidth: 1800
      },
      limits: {
        users: 100,
        storage: 2000,
        apiCalls: 500000,
        bandwidth: 5000
      },
      overage: {
        users: 0,
        storage: 0,
        apiCalls: 0,
        bandwidth: 0
      },
      nextBilling: new Date('2024-02-20'),
      invoices: [
        {
          id: 'INV-2024-002',
          date: new Date('2024-01-20'),
          amount: 2500,
          status: 'paid',
          items: [
            { description: 'Professional Plan - 100 Users', quantity: 1, rate: 2500, amount: 2500 }
          ]
        }
      ]
    }
  ];

  const revenueSummary: RevenueSummary = {
    totalRevenue: 2847500,
    monthlyRecurring: 247500,
    yearlyRecurring: 2600000,
    growthRate: 23.5,
    churnRate: 2.1,
    averageRevenuePerUser: 221.5
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

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const totalMonthlyRevenue = billingData.reduce((sum, org) => sum + org.monthlyRevenue, 0);
  const totalYearlyRevenue = billingData.reduce((sum, org) => sum + org.yearlyRevenue, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Enterprise Billing & Revenue
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive billing management and revenue analytics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              <DollarSign className="w-3 h-3 mr-1" />
              Revenue Tracking
            </Badge>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GradientCard
            title="Monthly Revenue"
            gradient="success"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {formatCurrency(totalMonthlyRevenue)}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 mr-1" />
                MRR
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Yearly Revenue"
            gradient="primary"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {formatCurrency(totalYearlyRevenue)}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                ARR
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="Growth Rate"
            gradient="accent"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-cyan-400">
                +{revenueSummary.growthRate}%
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <BarChart3 className="w-4 h-4 mr-1" />
                YoY Growth
              </div>
            </div>
          </GradientCard>

          <GradientCard
            title="ARPU"
            gradient="warning"
            glowEffect={true}
            className="text-center"
          >
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                {formatCurrency(revenueSummary.averageRevenuePerUser)}
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Users className="w-4 h-4 mr-1" />
                Per User
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card border">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="organizations" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Organizations
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GradientCard
                title="Revenue Breakdown"
                gradient="primary"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Enterprise Plans</span>
                    <span className="font-medium">{formatCurrency(180000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Professional Plans</span>
                    <span className="font-medium">{formatCurrency(30000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Starter Plans</span>
                    <span className="font-medium">{formatCurrency(12000)}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(222000)}</span>
                    </div>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Payment Status"
                gradient="success"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Paid</span>
                    </div>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="font-medium">1.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm">Overdue</span>
                    </div>
                    <span className="font-medium">0.3%</span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Key Metrics"
                gradient="accent"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Churn Rate</span>
                    <span className="font-medium text-green-400">{revenueSummary.churnRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Lifetime Value</span>
                    <span className="font-medium">{formatCurrency(12500)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gross Margin</span>
                    <span className="font-medium">87.3%</span>
                  </div>
                </div>
              </GradientCard>
            </div>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {billingData.map((org) => (
                <Card key={org.organizationId} className="backdrop-blur-sm bg-card/50 border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{org.organizationName}</CardTitle>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {org.plan}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                        <div className="text-2xl font-bold text-green-400">
                          {formatCurrency(org.monthlyRevenue)}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Yearly Revenue</span>
                        <div className="text-2xl font-bold">
                          {formatCurrency(org.yearlyRevenue)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Next Billing</span>
                        <span>{org.nextBilling.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Users</span>
                        <span>{org.usage.users} / {org.limits.users}</span>
                      </div>
                      <Progress value={getUsagePercentage(org.usage.users, org.limits.users)} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <CreditCard className="w-4 h-4 mr-2" />
                        View Billing
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

          <TabsContent value="invoices" className="space-y-6">
            <div className="space-y-4">
              {billingData.flatMap(org => 
                org.invoices.map(invoice => (
                  <Card key={invoice.id} className="backdrop-blur-sm bg-card/50 border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-medium">{invoice.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {org.organizationName}
                            </div>
                          </div>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {formatCurrency(invoice.amount)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {invoice.date.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-2">
                          {invoice.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.description}</span>
                              <span>{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {billingData.map((org) => (
                <GradientCard
                  key={org.organizationId}
                  title={org.organizationName}
                  gradient="accent"
                >
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Users</span>
                          <span>{org.usage.users} / {org.limits.users}</span>
                        </div>
                        <Progress value={getUsagePercentage(org.usage.users, org.limits.users)} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage (GB)</span>
                          <span>{org.usage.storage} / {org.limits.storage}</span>
                        </div>
                        <Progress value={getUsagePercentage(org.usage.storage, org.limits.storage)} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>API Calls</span>
                          <span>{formatNumber(org.usage.apiCalls)} / {formatNumber(org.limits.apiCalls)}</span>
                        </div>
                        <Progress value={getUsagePercentage(org.usage.apiCalls, org.limits.apiCalls)} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Bandwidth (GB)</span>
                          <span>{org.usage.bandwidth} / {org.limits.bandwidth}</span>
                        </div>
                        <Progress value={getUsagePercentage(org.usage.bandwidth, org.limits.bandwidth)} className="h-2" />
                      </div>
                    </div>
                  </div>
                </GradientCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GradientCard
                title="Revenue Trends"
                gradient="primary"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="font-medium">{formatCurrency(totalMonthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Month</span>
                    <span className="font-medium">{formatCurrency(235000)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Growth</span>
                    <span className="font-medium text-green-400">+5.3%</span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Customer Metrics"
                gradient="success"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Customers</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Churned Customers</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Net Growth</span>
                    <span className="font-medium text-green-400">+9</span>
                  </div>
                </div>
              </GradientCard>

              <GradientCard
                title="Plan Distribution"
                gradient="accent"
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Enterprise</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Professional</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Starter</span>
                    <span className="font-medium">20%</span>
                  </div>
                </div>
              </GradientCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}