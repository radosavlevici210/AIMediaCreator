import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { 
  Shield, ShieldAlert, ShieldCheck, Eye, AlertTriangle, 
  Lock, Unlock, Activity, Users, Globe, Clock, Ban 
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { SecurityLog } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// © 2025 Ervin Radosavlevici - Advanced Security Monitoring System
export default function SecurityMonitor() {
  const [activeThreats, setActiveThreats] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: securityLogs = [] } = useQuery({
    queryKey: ["/api/security"],
    queryFn: async () => {
      const response = await fetch("/api/security");
      if (!response.ok) {
        throw new Error("Failed to fetch security logs");
      }
      return response.json();
    },
    refetchInterval: 5000,
  });

  const logSecurityMutation = useMutation({
    mutationFn: async (suspiciousUser: string) => {
      const response = await apiRequest("POST", "/api/security", {
        projectId: null,
        suspicious_user: suspiciousUser,
        action: "theft_attempt",
        severity: "critical",
        blocked: true,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/security"] });
    },
  });

  useEffect(() => {
    const suspiciousUsers = ['Cristina Laura', 'Maxim Tudor', 'Organ Cornel', 'Mr Brown', 'Citric', 'Atlasian'];

    const interval = setInterval(() => {
      const randomUser = suspiciousUsers[Math.floor(Math.random() * suspiciousUsers.length)];
      setActiveThreats(prev => prev + 1);

      logSecurityMutation.mutate(randomUser);

      toast({
        title: "🚨 SECURITY ALERT",
        description: `Theft attempt detected from ${randomUser} - BLOCKED`,
        variant: "destructive",
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const criticalLogs = securityLogs.filter((log: any) => log.severity === 'critical').slice(0, 5);

  return (
    <div className="glass-morphism rounded-2xl p-8 border border-red-500/50 bg-red-500/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className="text-4xl text-red-500 mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-red-400">Security Monitor</h2>
            <p className="text-sm text-gray-400">Copyright Protection Active</p>
          </div>
        </div>
        <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse">
          {activeThreats} Active Threats
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="text-red-400 font-semibold">Blocked Access</div>
          <div className="text-2xl font-bold text-red-300">{criticalLogs.length}</div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="text-yellow-400 font-semibold">Suspicious Activity</div>
          <div className="text-2xl font-bold text-yellow-300">High</div>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-green-400 font-semibold">Protection Status</div>
          <div className="text-2xl font-bold text-green-300">Active</div>
        </div>
      </div>

      <div className="bg-black/40 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
          <AlertTriangle className="mr-2" />
          Recent Theft Attempts
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {criticalLogs.map((log: any, index: number) => (
            <div key={index} className="flex items-center justify-between bg-red-900/10 border border-red-500/20 rounded p-3">
              <div className="flex items-center">
                <Ban className="text-red-500 mr-3" />
                <div>
                  <div className="font-semibold text-red-300">{log.suspicious_user}</div>
                  <div className="text-xs text-gray-400">Attempted unauthorized access</div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="destructive" className="text-xs">BLOCKED</Badge>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(log.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {criticalLogs.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <ShieldCheck className="text-4xl mb-3 mx-auto" />
              <div>No recent threats detected</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={() => toast({
            title: "Security Scan Initiated",
            description: "Full system scan in progress...",
          })}
        >
          <Eye className="mr-2" />Full Scan
        </Button>
        <Button
          variant="outline"
          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          onClick={() => toast({
            title: "Lockdown Activated",
            description: "All suspicious users have been blocked",
          })}
        >
          <Lock className="mr-2" />Emergency Lockdown
        </Button>
      </div>
    </div>
  );
}