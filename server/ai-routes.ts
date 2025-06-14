import { Router } from 'express';
import { z } from 'zod';
import { generateMusicConcept, generateVideoConcept, generateCoverArt, analyzeMusicInput } from './openai.js';

const router = Router();

// Schema for music generation request
const musicGenerationSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  style: z.string().optional(),
  mood: z.string().optional()
});

// Schema for video generation request
const videoGenerationSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  duration: z.string().optional(),
  style: z.string().optional()
});

// Schema for cover art generation
const coverArtSchema = z.object({
  description: z.string().min(1, "Description is required")
});

// Schema for music analysis
const musicAnalysisSchema = z.object({
  input: z.string().min(1, "Input is required")
});

// Generate music concept
router.post('/generate-music', async (req, res) => {
  try {
    const { prompt, style, mood } = musicGenerationSchema.parse(req.body);
    
    const enhancedPrompt = `${prompt}${style ? ` in ${style} style` : ''}${mood ? ` with ${mood} mood` : ''}`;
    const musicConcept = await generateMusicConcept(enhancedPrompt);
    
    res.json({
      success: true,
      data: musicConcept
    });
  } catch (error) {
    console.error('Music generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate music concept'
    });
  }
});

// Generate video concept
router.post('/generate-video', async (req, res) => {
  try {
    const { prompt, duration, style } = videoGenerationSchema.parse(req.body);
    
    const enhancedPrompt = `${prompt}${duration ? ` (${duration})` : ''}${style ? ` in ${style} style` : ''}`;
    const videoConcept = await generateVideoConcept(enhancedPrompt);
    
    res.json({
      success: true,
      data: videoConcept
    });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate video concept'
    });
  }
});

// Generate cover art
router.post('/generate-cover', async (req, res) => {
  try {
    const { description } = coverArtSchema.parse(req.body);
    
    const coverArt = await generateCoverArt(description);
    
    res.json({
      success: true,
      data: coverArt
    });
  } catch (error) {
    console.error('Cover art generation error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate cover art'
    });
  }
});

// Analyze music input
router.post('/analyze-music', async (req, res) => {
  try {
    const { input } = musicAnalysisSchema.parse(req.body);
    
    const analysis = await analyzeMusicInput(input);
    
    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Music analysis error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze music input'
    });
  }
});

export { router as aiRoutes };