
import { useEffect, useState, useCallback } from 'react';

export function useRouterConnection() {
  const [isConnected, setIsConnected] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const checkConnection = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/router-status', {
        method: 'GET',
        headers: {
          'X-Router-Connection': 'check'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        setIsConnected(true);
        setRetryCount(0);
        return true;
      } else {
        throw new Error(`Connection failed: ${response.status}`);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.warn('Router connection check failed:', error);
        setIsConnected(false);
        setRetryCount(prev => Math.min(prev + 1, 10));
      }
      return false;
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let retryTimeoutId: NodeJS.Timeout;

    const performCheck = async () => {
      const success = await checkConnection();
      
      if (!success && retryCount < 5) {
        const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
        retryTimeoutId = setTimeout(performCheck, delay);
      }
    };

    // Initial check
    performCheck();
    
    // Regular interval check every 30 seconds
    intervalId = setInterval(performCheck, 30000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(retryTimeoutId);
    };
  }, [checkConnection, retryCount]);

  return { isConnected, retryCount };
}
