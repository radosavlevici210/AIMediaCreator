export const audioFormats = [
  { value: 'mp3', label: 'MP3', description: 'Compressed audio format' },
  { value: 'wav', label: 'WAV', description: 'Uncompressed high quality' },
  { value: 'flac', label: 'FLAC', description: 'Lossless compression' },
  { value: 'aac', label: 'AAC', description: 'Advanced audio codec' },
];

export const audioQualities = [
  { value: 'high', label: 'High (320kbps)', bitrate: 320 },
  { value: 'medium', label: 'Medium (192kbps)', bitrate: 192 },
  { value: 'low', label: 'Low (128kbps)', bitrate: 128 },
];

export const musicGenres = [
  'electronic-pop',
  'synthwave',
  'ambient',
  'lo-fi-hip-hop',
  'cinematic',
  'rock',
  'jazz',
  'classical',
  'folk',
  'experimental',
];

export const durations = [
  '1:30',
  '2:00',
  '3:00',
  '3:30',
  '4:00',
  '5:00',
  'custom',
];

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function parseDuration(duration: string): number {
  if (duration === 'custom') return 0;
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + (seconds || 0);
}
