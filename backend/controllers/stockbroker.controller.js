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
            {role: "system", content: "You are an expert at stock market,give answers relevant to your knowledge even if the date surpass"},
             {role: "user", content: userPrompt || "Tell me a mind blowing fact about quantum mechanics?"}
            ]
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