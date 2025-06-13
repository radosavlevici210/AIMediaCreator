
import { useEffect, useState } from 'react';

export function useRouterConnection() {
  const [isConnected, setIsConnected] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const checkConnection = async () => {
      try {
        const response = await fetch('/api/router-status', {
          method: 'GET',
          headers: {
            'X-Router-Connection': 'check'
          }
        });
        
        if (response.ok) {
          setIsConnected(true);
          setRetryCount(0);
        } else {
          throw new Error('Connection failed');
        }
      } catch (error) {
        console.warn('Router connection check failed:', error);
        setIsConnected(false);
        setRetryCount(prev => prev + 1);
        
        // Retry with exponential backoff
        if (retryCount < 5) {
          timeoutId = setTimeout(checkConnection, Math.min(1000 * Math.pow(2, retryCount), 10000));
        }
      }
    };

    // Check connection every 30 seconds
    intervalId = setInterval(checkConnection, 30000);
    
    // Initial check
    checkConnection();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [retryCount]);

  return { isConnected, retryCount };
}
