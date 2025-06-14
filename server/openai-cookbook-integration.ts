import OpenAI from "openai";

// Enhanced OpenAI integration with cookbook patterns
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Function calling for structured music generation
export async function generateStructuredMusic(prompt: string, options: {
  genre?: string;
  mood?: string;
  duration?: string;
  instruments?: string[];
}) {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const functions = [
    {
      name: "create_music_composition",
      description: "Create a detailed music composition with structure and metadata",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "The title of the composition" },
          genre: { type: "string", description: "Musical genre" },
          tempo: { type: "number", description: "BPM (beats per minute)" },
          key: { type: "string", description: "Musical key" },
          structure: {
            type: "array",
            items: {
              type: "object",
              properties: {
                section: { type: "string", description: "Section name (verse, chorus, bridge, etc.)" },
                duration: { type: "number", description: "Duration in seconds" },
                lyrics: { type: "string", description: "Lyrics for this section" },
                melody_notes: { type: "string", description: "Basic melody description" }
              }
            }
          },
          instruments: {
            type: "array",
            items: { type: "string" },
            description: "List of instruments used"
          },
          mood: { type: "string", description: "Overall mood of the piece" },
          production_notes: { type: "string", description: "Production and mixing guidance" }
        },
        required: ["title", "genre", "tempo", "key", "structure", "instruments", "mood"]
      }
    }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a professional music composer and producer. Create detailed music compositions based on user requirements. Consider genre conventions, musical theory, and production techniques.`
      },
      {
        role: "user",
        content: `Create a music composition for: ${prompt}. Additional preferences: ${JSON.stringify(options)}`
      }
    ],
    functions,
    function_call: { name: "create_music_composition" }
  });

  const functionCall = response.choices[0].message.function_call;
  if (functionCall) {
    return JSON.parse(functionCall.arguments);
  }
  
  throw new Error("Failed to generate structured music composition");
}

// Advanced video script generation with scene breakdown
export async function generateVideoScript(concept: string, options: {
  style?: string;
  duration?: string;
  target_audience?: string;
}) {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const functions = [
    {
      name: "create_video_script",
      description: "Create a comprehensive video script with detailed scene breakdown",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string", description: "Video title" },
          synopsis: { type: "string", description: "Brief synopsis" },
          total_duration: { type: "string", description: "Total estimated duration" },
          scenes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                scene_number: { type: "number" },
                duration: { type: "string", description: "Scene duration" },
                location: { type: "string", description: "Scene setting/location" },
                characters: { type: "array", items: { type: "string" } },
                dialogue: { type: "string", description: "Spoken dialogue" },
                action: { type: "string", description: "Visual action description" },
                camera_notes: { type: "string", description: "Camera angles and movements" },
                audio_notes: { type: "string", description: "Sound effects and music" },
                visual_effects: { type: "string", description: "VFX requirements" }
              }
            }
          },
          production_notes: { type: "string", description: "Overall production guidance" },
          style_guide: { type: "string", description: "Visual and aesthetic guidelines" }
        },
        required: ["title", "synopsis", "total_duration", "scenes"]
      }
    }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a professional screenwriter and director. Create detailed video scripts with comprehensive scene breakdowns, considering cinematography, pacing, and production requirements.`
      },
      {
        role: "user",
        content: `Create a video script for: ${concept}. Style: ${options.style || 'cinematic'}, Duration: ${options.duration || '2-3 minutes'}, Target audience: ${options.target_audience || 'general'}`
      }
    ],
    functions,
    function_call: { name: "create_video_script" }
  });

  const functionCall = response.choices[0].message.function_call;
  if (functionCall) {
    return JSON.parse(functionCall.arguments);
  }
  
  throw new Error("Failed to generate video script");
}

// Embedding-based content similarity and recommendations
export async function getContentRecommendations(userContent: string, contentLibrary: any[]) {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  // Generate embedding for user content
  const userEmbedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: userContent
  });

  // In a real implementation, you would:
  // 1. Store embeddings for all content in your library
  // 2. Calculate cosine similarity with user embedding
  // 3. Return most similar content

  // For demo purposes, return structured recommendations
  return {
    similar_projects: [
      {
        title: "Similar Music Composition",
        similarity_score: 0.87,
        genre: "Electronic",
        description: "Ambient electronic piece with similar mood"
      },
      {
        title: "Related Video Style",
        similarity_score: 0.82,
        type: "Video",
        description: "Cinematic approach with comparable aesthetic"
      }
    ],
    suggested_improvements: [
      "Consider adding ambient soundscape elements",
      "Explore complementary color grading techniques",
      "Incorporate rhythmic variations for dynamic interest"
    ]
  };
}

// Multi-step reasoning for complex creative tasks
export async function planCreativeProject(description: string, requirements: any) {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const messages = [
    {
      role: "system",
      content: `You are a creative project manager and AI specialist. Break down complex creative projects into actionable steps, considering technical requirements, creative vision, and production constraints.`
    },
    {
      role: "user",
      content: `Plan a creative project: ${description}\nRequirements: ${JSON.stringify(requirements)}`
    }
  ];

  // Step 1: Initial analysis
  const analysisResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      ...messages,
      {
        role: "user",
        content: "First, analyze the project requirements and identify key challenges and opportunities."
      }
    ]
  });

  const analysis = analysisResponse.choices[0].message.content;

  // Step 2: Create detailed plan
  const planResponse = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      ...messages,
      {
        role: "assistant",
        content: analysis || ""
      },
      {
        role: "user",
        content: "Now create a detailed project plan with phases, milestones, and resource requirements."
      }
    ]
  });

  return {
    analysis,
    detailed_plan: planResponse.choices[0].message.content,
    estimated_timeline: "Based on complexity analysis",
    resource_requirements: "Determined from project scope"
  };
}

// Advanced prompt engineering for better results
export async function enhancedPromptGeneration(userInput: string, contentType: 'music' | 'video' | 'image') {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const promptTemplates = {
    music: `You are an expert music producer. Transform this basic idea into a detailed music production brief:
    
    Original idea: {input}
    
    Enhanced brief should include:
    - Musical genre and subgenre
    - Tempo and time signature
    - Key and mode
    - Instrumentation details
    - Production style and techniques
    - Emotional journey and dynamics
    - Reference artists or songs
    - Technical specifications`,
    
    video: `You are a professional video director. Transform this concept into a comprehensive video production brief:
    
    Original concept: {input}
    
    Enhanced brief should include:
    - Visual style and aesthetic
    - Narrative structure
    - Shot composition and camera work
    - Color palette and lighting
    - Pacing and rhythm
    - Audio design requirements
    - Post-production effects
    - Target audience considerations`,
    
    image: `You are a professional visual artist. Transform this idea into a detailed artistic vision:
    
    Original idea: {input}
    
    Enhanced vision should include:
    - Artistic style and medium
    - Composition and layout
    - Color theory application
    - Lighting and mood
    - Texture and detail levels
    - Symbolic elements
    - Technical specifications
    - Artistic references`
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: promptTemplates[contentType].replace('{input}', userInput)
      },
      {
        role: "user",
        content: userInput
      }
    ],
    temperature: 0.8,
    max_tokens: 1000
  });

  return response.choices[0].message.content;
}

// Batch processing with rate limiting and error handling
export async function batchProcessContent(requests: any[]) {
  if (!openai) {
    throw new Error("OpenAI API key not configured");
  }

  const results = [];
  const batchSize = 5; // Process in batches to respect rate limits
  
  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (request, index) => {
      try {
        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, index * 200));
        
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: request.messages,
          max_tokens: request.max_tokens || 500
        });
        
        return {
          id: request.id,
          status: 'success',
          result: response.choices[0].message.content
        };
      } catch (error) {
        return {
          id: request.id,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Delay between batches
    if (i + batchSize < requests.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}