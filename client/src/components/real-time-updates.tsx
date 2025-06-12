import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle, Clock } from "lucide-react";

interface SystemNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
  timestamp: Date;
}

export default function RealTimeUpdates() {
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected');
  const queryClient = useQueryClient();

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/security"] });

      // Add system notifications
      const messages = [
        { type: 'success' as const, message: 'Project processing completed successfully' },
        { type: 'info' as const, message: 'New AI model version available' },
        { type: 'warning' as const, message: 'High CPU usage detected' },
        { type: 'success' as const, message: 'Media export finished' },
        { type: 'info' as const, message: 'System performance optimized' }
      ];

      if (Math.random() > 0.7) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const notification: SystemNotification = {
          id: Date.now().toString(),
          ...randomMessage,
          timestamp: new Date()
        };

        setNotifications(prev => [notification, ...prev.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [queryClient]);

  const getNotificationIcon = (type: SystemNotification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Live Updates
          </div>
          <Badge 
            variant={connectionStatus === 'connected' ? 'secondary' : 'destructive'}
            className="flex items-center gap-1"
          >
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`} />
            {connectionStatus}
          </Badge>
        </CardTitle>
        <CardDescription>
          Real-time system notifications and status updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Waiting for system updates...</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 border rounded-lg bg-card/50"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}