import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateTrip = async (req, res) => {
  try {
    const { destination, days, budget, travelType } = req.body;

    const prompt = `
You are the AI Travel Assistant for LetsStay, a modern travel planning platform.

Create a personalized ${days}-day travel itinerary.

Trip Details:
- Destination: ${destination}
- Budget: ₹${budget}
- Travel Type: ${travelType}

Your response should be engaging, practical, and easy to read on a website.

Return ONLY Markdown.

## Formatting Rules

- Start with an attractive title using an emoji.
- Begin with a short welcome paragraph (2-3 sentences).
- Use clear Markdown headings.
- Use emojis naturally (📍 📅 💰 🌅 🍽️ 🏖️ 🚗 ✈️ 🎉).
- Keep paragraphs short (maximum 2 lines).
- Use bullet points instead of long paragraphs.
- Bold important information.
- Avoid repeating information.
- Keep the language friendly and conversational.
- Make it feel like recommendations from a local travel guide.
- Do NOT write large walls of text.

## Structure

# 🌴 Trip Title

A short welcome message.

---

## 📍 Trip Overview

- **Destination**
- **Duration**
- **Budget**
- **Travel Type**

---

## 🗓️ Day 1 – Title

### ☀️ Morning
- Activities

### 🍽️ Lunch
- Recommended place or cuisine

### 🌇 Afternoon
- Activities

### 🌅 Evening
- Activities

### 🌙 Night
- Nightlife or relaxation

💡 **Local Tip**
> One useful insider tip.

---

Repeat the same format for each day.

---

## 💰 Budget Breakdown

Present the budget as a Markdown table.

| Category | Estimated Cost |
|----------|---------------:|
| Accommodation | ₹... |
| Food | ₹... |
| Transport | ₹... |
| Activities | ₹... |
| Miscellaneous | ₹... |

---

## 📍 Top Attractions

List 5–8 attractions with one short description each.

---

## 🍛 Must-Try Food

List 5–8 local dishes with one-line descriptions.

---

## 🎒 Packing Checklist

- Sunscreen
- Sunglasses
- Comfortable footwear
- Power bank
- Swimwear
- Any destination-specific essentials

---

## ✨ Final Travel Tips

Provide 5–8 concise travel tips.

End the itinerary with a short, friendly closing message wishing the traveler a great trip.

Do NOT return JSON.
Do NOT wrap the response inside code blocks.
`;

    const result = await model.generateContent(prompt);

    const trip = result.response.text();

    res.status(200).json({
      success: true,
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate trip",
    });
  }
};
