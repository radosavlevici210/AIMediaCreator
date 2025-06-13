import { useEffect, useState } from "react";

interface WaveformVisualizerProps {
  isActive?: boolean;
}

function WaveformVisualizer({ isActive = false }: WaveformVisualizerProps) {
  const [bars, setBars] = useState<number[]>(Array(8).fill(12));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(8).fill(12));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 40 + 12));
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="bg-[hsl(0,0%,7%)]/60 rounded-lg p-4 mb-4">
      <div className="flex items-end justify-center space-x-1 h-16">
        {bars.map((height, index) => (
          <div
            key={index}
            className="w-2 bg-gradient-to-t from-[hsl(150,100%,50%)] to-[hsl(210,100%,60%)] rounded-t transition-all duration-150 wave-bar"
            style={{ 
              height: `${height}px`,
              animationDelay: `${index * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export { WaveformVisualizer };
export default WaveformVisualizer;
