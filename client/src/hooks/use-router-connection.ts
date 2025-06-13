import { useState, useEffect, useCallback } from 'react';

export function useRouterConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch('/api/router-status');
      const data = await response.json();
      setIsConnected(data.status === 'connected');
      setLastChecked(new Date());
    } catch (error) {
      console.error('Router connection check failed:', error);
      setIsConnected(false);
      setLastChecked(new Date());
    }
  }, []);

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  return { isConnected, lastChecked, checkConnection };
}