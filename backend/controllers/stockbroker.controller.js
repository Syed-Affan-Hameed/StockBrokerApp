import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getStockbrokerInfo = async (req, res) => {
   try{
    const userPrompt = req.body.userPrompt;
    const openaiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are an expert at stock market,give answers relevant to your knowledge and answer in plain text"},
             {role: "user", content: userPrompt || "Tell me a mind blowing fact about quantum mechanics?"}
            ],
            temperature: 1.2,
            max_tokens: 200,
    });
    res.status(200).json({
        success: true,
        data: openaiResponse.choices[0].message.content
    });
   }
   catch(error){
    console.log("Error in getStockbrokerInfo", error);
    res.status(500).json({
        success: false,
        error: 'Failed to get response from OpenAI'
      });
   }
};

export const getImage = async (req, res) => {
try{
    const userPromptForImage = req.body.userPromptForImage;
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: userPromptForImage,
    n: 1,
    size: "1024x1024"
  });
  const imageUrl = response.data[0].url;

  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();

    // Set status and headers
    res.status(200);
    res.setHeader('Content-Disposition', 'attachment; filename="generated-image.png"');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Length', Buffer.byteLength(imageBuffer));
    
    // Send the buffer
    res.send(Buffer.from(imageBuffer));
}
catch(error){
    console.log("Error in getImage", error);
    res.status(500).json({
        success: false,
        error: 'Failed to get response from OpenAI'
      });
}
};

