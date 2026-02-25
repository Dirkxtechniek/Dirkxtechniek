import { useState, useEffect } from 'react';

interface ClockData {
  utcTime: string;
  localTime: string;
  date: string;
}

export function useClock(): ClockData {
  const [clockData, setClockData] = useState<ClockData>({
    utcTime: '00:00:00',
    localTime: '00:00:00',
    date: '0000-00-00',
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      
      const utcTime = now.toISOString().split('T')[1].split('.')[0];
      const localTime = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const date = now.toISOString().split('T')[0];
      
      setClockData({ utcTime, localTime, date });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return clockData;
}
