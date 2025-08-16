import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await groq.chat.completions.create({
      //   model: "llama-3.1-70b-versatile", // or llama-3.1-8b-instant (faster & cheaper)
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: messages,
        },
      ],
    });

    return new Response(JSON.stringify(response.choices[0].message.content));
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
}
