require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/generate", async (req, res) => {

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: req.body.contents
        });

        res.json({
            text: response.text
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});