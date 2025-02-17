import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not defined");
    }

    // Define the prompt as a string directly or get it from the request body
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content with the prompt
    const result = await model.generateContent(prompt);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 400 });
    } else {
      console.error("An unexpected error occurred", error);
      throw error;
    }
  }
}

// The code above defines a POST route that generates a list of three open-ended and engaging questions suitable for an anonymous social messaging platform. The route uses the  GoogleGenerativeAI  class from the  @google/generative-ai  package to generate the content.
// The route first checks if the  GOOGLE_API_KEY  environment variable is defined. If it’s not, an error is thrown. The route then defines the prompt as a string and creates an instance of the  GoogleGenerativeAI  class with the API key. It then gets the  gemini-pro  model and generates content with the prompt. The generated content is returned as a response.
// The route is now ready to be used in the application.
// Step 4: Add the Route to the Application
// The last step is to add the route to the application. This can be done by importing the route and adding it to the application’s router.
