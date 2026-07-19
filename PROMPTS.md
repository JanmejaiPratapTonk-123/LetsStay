# PROMPTS.md

# AI Trip Planner – Prompt Iterations

This document records the prompt engineering process used while developing the AI Trip Planner feature for the LetsStay application.

---

# Prompt Version 1

## Prompt

```text
You are an expert travel planner.

Generate a ${days}-day travel itinerary.

Destination: ${destination}
Budget: ₹${budget}
Travel Type: ${travelType}

Return:

1. Day-wise itinerary
2. Budget breakdown
3. Top attractions
4. Food recommendations
5. Travel tips

Return the response in Markdown.

Use:
# Main Heading
## Section Headings
- Bullet points
- Numbered lists

Do not return JSON.
Do not wrap the response inside code blocks.
```

### Example Input

- Destination: Goa
- Days: 5
- Budget: ₹15000
- Travel Type: Friends

### Observation

The generated itinerary was informative but very lengthy. Most sections were written as large paragraphs, making the output feel like a travel blog instead of an in-app itinerary.

---

# Prompt Version 2

## Prompt

```text
You are the AI Travel Assistant for LetsStay.

Generate a personalized travel itinerary.

Return ONLY Markdown.

Use headings, bullet points, numbered lists, and tables.

Keep paragraphs short.

Use emojis naturally.

Avoid large blocks of text.

Do not return JSON.
```

### Example Input

- Destination: Goa
- Days: 5
- Budget: ₹15000
- Travel Type: Friends

### Observation

The output became cleaner and easier to read. Markdown formatting improved the presentation, but some sections still contained unnecessary descriptions.

---

# Prompt Version 3 (Final)

## Prompt

```text
You are the AI Travel Assistant for LetsStay, a modern travel planning platform.

Create a personalized ${days}-day travel itinerary.

Trip Details:
- Destination: ${destination}
- Budget: ₹${budget}
- Travel Type: ${travelType}

Return ONLY Markdown.

Formatting Rules:
- Start with an attractive title using an emoji.
- Begin with a short welcome message.
- Use Markdown headings.
- Use emojis naturally.
- Keep paragraphs under two lines.
- Use bullet points instead of long paragraphs.
- Present the budget as a Markdown table.
- Add local travel tips.
- Keep the language friendly and engaging.
- Do not return JSON.
```

### Example Input

- Destination: Goa
- Days: 5
- Budget: ₹15000
- Travel Type: Friends

### Example Output

- Personalized trip title
- Trip overview
- Day-wise itinerary
- Budget breakdown table
- Top attractions
- Food recommendations
- Packing checklist
- Travel tips

---

# Best Prompt

Prompt Version 3 produced the best results.

It generated concise, well-structured Markdown that worked well with **ReactMarkdown** in the frontend. The itinerary was much easier to read because it used headings, bullet points, emojis, and tables instead of large paragraphs. The overall presentation felt more like a travel planning application rather than a generic AI response, providing a better user experience for the LetsStay platform.
