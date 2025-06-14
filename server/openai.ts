import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Music generation with AI
export async function generateMusicConcept(prompt: string): Promise<{
  title: string;
  genre: string;
  mood: string;
  lyrics: string;
  structure: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional music producer and songwriter. Create detailed music concepts including title, genre, mood, lyrics, and structure. Respond with JSON in this format: { 'title': string, 'genre': string, 'mood': string, 'lyrics': string, 'structure': string }"
        },
        {
          role: "user",
          content: `Create a music concept for: ${prompt}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      title: result.title || "Untitled",
      genre: result.genre || "Electronic",
      mood: result.mood || "Energetic",
      lyrics: result.lyrics || "No lyrics generated",
      structure: result.structure || "Verse-Chorus-Verse-Chorus-Bridge-Chorus"
    };
  } catch (error) {
    throw new Error("Failed to generate music concept: " + (error as Error).message);
  }
}

// Video concept generation
export async function generateVideoConcept(prompt: string): Promise<{
  title: string;
  description: string;
  scenes: string[];
  style: string;
  duration: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional video director and cinematographer. Create detailed video concepts including title, description, scenes breakdown, visual style, and duration. Respond with JSON in this format: { 'title': string, 'description': string, 'scenes': string[], 'style': string, 'duration': string }"
        },
        {
          role: "user",
          content: `Create a video concept for: ${prompt}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      title: result.title || "Untitled Video",
      description: result.description || "No description available",
      scenes: result.scenes || ["Opening scene", "Main content", "Closing scene"],
      style: result.style || "Modern cinematic",
      duration: result.duration || "2-3 minutes"
    };
  } catch (error) {
    throw new Error("Failed to generate video concept: " + (error as Error).message);
  }
}

// Image generation for video thumbnails/covers
export async function generateCoverArt(description: string): Promise<{ url: string }> {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a professional, modern cover art for: ${description}. Style: sleek, vibrant, high-quality, artistic`,
      n: 1,
      size: "1024x1024",
      quality: "standard"
    });

    return { url: response.data[0]?.url || "" };
  } catch (error) {
    throw new Error("Failed to generate cover art: " + (error as Error).message);
  }
}

// Analyze user input and suggest improvements
export async function analyzeMusicInput(input: string): Promise<{
  suggestions: string[];
  improvements: string[];
  genre_recommendations: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a music industry expert. Analyze user input and provide suggestions, improvements, and genre recommendations. Respond with JSON in this format: { 'suggestions': string[], 'improvements': string[], 'genre_recommendations': string[] }"
        },
        {
          role: "user",
          content: `Analyze this music idea and provide feedback: ${input}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      suggestions: result.suggestions || ["Consider adding more details"],
      improvements: result.improvements || ["Expand on the concept"],
      genre_recommendations: result.genre_recommendations || ["Electronic", "Pop"]
    };
  } catch (error) {
    throw new Error("Failed to analyze music input: " + (error as Error).message);
  }
}