const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

module.exports = async (req, res) => {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method Not Allowed"
        });
    }

    try {

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: req.body.contents
        });

        res.status(200).json({
            text: response.text
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};