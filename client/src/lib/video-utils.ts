export const videoFormats = [
  { value: 'mp4', label: 'MP4', description: 'Universal compatibility' },
  { value: 'mov', label: 'MOV', description: 'High quality Apple format' },
  { value: 'webm', label: 'WebM', description: 'Web optimized format' },
  { value: 'avi', label: 'AVI', description: 'Windows standard format' },
];

export const videoQualities = [
  { value: '4k', label: '4K Ultra HD (3840x2160)', width: 3840, height: 2160 },
  { value: '1080p', label: '1080p Full HD (1920x1080)', width: 1920, height: 1080 },
  { value: '720p', label: '720p HD (1280x720)', width: 1280, height: 720 },
  { value: '480p', label: '480p SD (854x480)', width: 854, height: 480 },
];

export const videoStyles = [
  'cinematic',
  'music-video',
  'abstract',
  'documentary',
  'animation',
  'commercial',
  'artistic',
  'realistic',
  'surreal',
  'minimalist',
];

export function getVideoAspectRatio(quality: string): number {
  const qualityData = videoQualities.find(q => q.value === quality);
  if (!qualityData) return 16/9;
  return qualityData.width / qualityData.height;
}

export function estimateFileSize(duration: number, quality: string, format: string): number {
  // Rough estimation in MB
  const baseRates = {
    '4k': 25,      // MB per minute
    '1080p': 8,    // MB per minute
    '720p': 4,     // MB per minute
    '480p': 2,     // MB per minute
  };
  
  const formatMultipliers = {
    'mp4': 1,
    'mov': 1.2,
    'webm': 0.8,
    'avi': 1.5,
  };
  
  const baseRate = baseRates[quality as keyof typeof baseRates] || 8;
  const formatMultiplier = formatMultipliers[format as keyof typeof formatMultipliers] || 1;
  const durationMinutes = duration / 60;
  
  return Math.round(baseRate * formatMultiplier * durationMinutes);
}
