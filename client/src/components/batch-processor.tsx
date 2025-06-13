
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Layers, 
  Play, 
  Pause, 
  Download,
  Settings,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface BatchJob {
  id: string;
  name: string;
  type: 'video' | 'music' | 'animation';
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  settings: Record<string, any>;
}

export default function BatchProcessor() {
  const [batchJobs, setBatchJobs] = useState<BatchJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const addBatchJob = (type: 'video' | 'music' | 'animation') => {
    const newJob: BatchJob = {
      id: Date.now().toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Job ${batchJobs.length + 1}`,
      type,
      status: 'pending',
      progress: 0,
      settings: {}
    };
    setBatchJobs(prev => [...prev, newJob]);
  };

  const removeBatchJob = (id: string) => {
    setBatchJobs(prev => prev.filter(job => job.id !== id));
  };

  const processBatch = async () => {
    if (batchJobs.length === 0) return;
    
    setIsProcessing(true);
    
    for (let i = 0; i < batchJobs.length; i++) {
      const jobId = batchJobs[i].id;
      
      // Update job status to processing
      setBatchJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: 'processing' as const } : job
      ));

      // Simulate processing with progress updates
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setBatchJobs(prev => prev.map(job => 
          job.id === jobId ? { ...job, progress } : job
        ));
      }

      // Mark as completed
      setBatchJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, status: 'completed' as const, progress: 100 } : job
      ));
    }
    
    setIsProcessing(false);
  };

  const getStatusIcon = (status: BatchJob['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing': return <Play className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: BatchJob['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'error': return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>Batch Processor</CardTitle>
              <p className="text-sm text-muted-foreground">Professional batch content generation</p>
            </div>
          </div>
          <Badge variant="outline" className="premium-feature">
            Pro
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Job Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => addBatchJob('video')}
            disabled={isProcessing}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Video Job
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => addBatchJob('music')}
            disabled={isProcessing}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Music Job
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => addBatchJob('animation')}
            disabled={isProcessing}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Animation Job
          </Button>
        </div>

        {/* Batch Jobs List */}
        <div className="space-y-3">
          {batchJobs.map((job) => (
            <div key={job.id} className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="flex items-center gap-2 flex-1">
                {getStatusIcon(job.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{job.name}</span>
                    <Badge variant="outline" className={getStatusColor(job.status)}>
                      {job.status}
                    </Badge>
                  </div>
                  {job.status === 'processing' && (
                    <Progress value={job.progress} className="h-2" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => removeBatchJob(job.id)}
                  disabled={isProcessing}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                {job.status === 'completed' && (
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          
          {batchJobs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No batch jobs added yet</p>
              <p className="text-sm">Add jobs above to start batch processing</p>
            </div>
          )}
        </div>

        {/* Process Batch Button */}
        {batchJobs.length > 0 && (
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={processBatch}
              disabled={isProcessing || batchJobs.length === 0}
            >
              {isProcessing ? (
                <>
                  <Play className="w-4 h-4 mr-2 animate-spin" />
                  Processing Batch...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Process All ({batchJobs.length} jobs)
                </>
              )}
            </Button>
            <Button 
              variant="outline"
              onClick={() => setBatchJobs([])}
              disabled={isProcessing}
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Batch Statistics */}
        {batchJobs.length > 0 && (
          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="font-semibold text-yellow-500">{batchJobs.filter(j => j.status === 'pending').length}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-500">{batchJobs.filter(j => j.status === 'processing').length}</div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-green-500">{batchJobs.filter(j => j.status === 'completed').length}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-red-500">{batchJobs.filter(j => j.status === 'error').length}</div>
              <div className="text-xs text-muted-foreground">Errors</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
