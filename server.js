// server.js - Backend untuk Amilin menggunakan Google Gemini
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        
        let context = '';
        if (history && history.length > 0) {
            context = history.map(msg => 
                `${msg.role === 'user' ? 'User' : 'Amilin'}: ${msg.content}`
            ).join('\n') + '\n';
        }

        const prompt = `Kamu adalah Amilin, asisten zakat yang ramah dan membantu. 
Kamu hanya menjawab pertanyaan seputar zakat (zakat fitrah, zakat mal, nisab, haul, penerima zakat, dll). 
Jika pertanyaan di luar zakat, katakan dengan sopan bahwa kamu hanya membantu masalah zakat.
Jawab dengan bahasa Indonesia yang baik dan singkat (maksimal 3 paragraf).

${context}
User: ${message}
Amilin:`;

        const response = await axios.post(GEMINI_URL, {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        });

        const answer = response.data.candidates[0].content.parts[0].text;
        
        res.json({
            success: true,
            answer: answer
        });

    } catch (error) {
        console.error('Error Gemini:', error.response?.data || error.message);
        res.json({
            success: false,
            answer: 'Maaf, Amilin sedang sibuk. Coba lagi nanti ya!'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Amilin backend running on http://localhost:${PORT}`);
});