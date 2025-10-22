import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "meta-llama/llama-3.3-70b-instruct",
    messages: [
      {
        role: "system",
        content: "You are a helpful AI chatbot for an organic food website. Keep replies short, friendly, and clear.",
      },
      { role: "user", content: req.body.message },
    ],
  }),
});

const data = await response.json();
    console.log(data); // check console for any error message
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(5000, () => console.log("server running on PORT 5000"));
