interface ProductionDashboardProps {
  stats?: {
    totalProjects: number;
    completedProjects: number;
    processingProjects: number;
    avgProcessingTime: number;
  };
}

// © 2025 Ervin Radosavlevici - Professional Production Dashboard
export default function ProductionDashboard({ stats }: ProductionDashboardProps) {
  const defaultStats = {
    totalProjects: 0,
    completedProjects: 0,
    processingProjects: 0,
    avgProcessingTime: 0,
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="mt-12">
      <div className="mb-6 text-center">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ervin Radosavlevici - Production Dashboard | {new Date().toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-morphism bg-[hsl(150,100%,50%)]/10 rounded-xl p-6 border border-[hsl(150,100%,50%)]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[hsl(150,100%,50%)] font-semibold">Projects Created</p>
              <p className="text-3xl font-bold">{displayStats.totalProjects}</p>
            </div>
            <i className="fas fa-folder text-3xl text-[hsl(150,100%,50%)] opacity-60"></i>
          </div>
        </div>

        <div className="glass-morphism bg-[hsl(210,100%,60%)]/10 rounded-xl p-6 border border-[hsl(210,100%,60%)]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[hsl(210,100%,60%)] font-semibold">Processing Time</p>
              <p className="text-3xl font-bold">{displayStats.avgProcessingTime}s</p>
            </div>
            <i className="fas fa-clock text-3xl text-[hsl(210,100%,60%)] opacity-60"></i>
          </div>
        </div>

        <div className="glass-morphism bg-[hsl(320,100%,50%)]/10 rounded-xl p-6 border border-[hsl(320,100%,50%)]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[hsl(320,100%,50%)] font-semibold">Completed</p>
              <p className="text-3xl font-bold">{displayStats.completedProjects}</p>
            </div>
            <i className="fas fa-check-circle text-3xl text-[hsl(320,100%,50%)] opacity-60"></i>
          </div>
        </div>

        <div className="glass-morphism bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 font-semibold">Processing</p>
              <p className="text-3xl font-bold">{displayStats.processingProjects}</p>
            </div>
            <i className="fas fa-spinner text-3xl text-gray-400 opacity-60"></i>
          </div>
        </div>
      </div>
    </div>
  );
}