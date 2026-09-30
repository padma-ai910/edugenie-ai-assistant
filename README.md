# EduGenie AI Assistant

Build a simple, attractive, responsive web application called **EduGenie – AI-Powered Learning Assistant**.

The application is a college project. Keep the implementation simple, reliable, and easy to connect to a separate FastAPI backend.

## Technology

Use:

* React
* TypeScript
* Tailwind CSS
* Lucide React icons

Do NOT add:

* Database
* Authentication
* Supabase
* Payment
* Admin dashboard
* Complex state management
* Unnecessary features

The four main features must be clearly visible and functional from the frontend.

## Design

Create a modern AI education interface.

Style:

* Clean
* Futuristic
* Professional
* Student-friendly
* Modern gradients
* Rounded cards
* Soft shadows
* Subtle hover effects
* Smooth but minimal animations

Use a consistent blue/purple AI-themed visual style.

Make the application fully responsive for desktop, tablet and mobile.

---

# HOME PAGE

Create a landing page for EduGenie.

Hero:

"EduGenie"

"Learn Smarter. Understand Faster."

Description:

"Your AI-powered learning companion for quizzes, summaries, explanations, and organized study material."

Buttons:

"Start Learning"
"Explore Features"

Create four feature cards:

1. AI Quiz Generator
2. Smart Summarizer
3. AI Tutor
4. Smart Content Structurer

Each card should navigate to its respective feature.

Add a simple section:

"Powered by Gemini AI"

Do not claim any unsupported capabilities.

---

# DASHBOARD

Create a dashboard with:

Header:

* EduGenie logo/name
* Dashboard
* Quiz
* Summarizer
* AI Tutor
* Structurer

Main heading:

"Your AI Learning Dashboard"

Subtitle:

"Choose a tool and start learning."

Display four large feature cards.

Each card should have:

* Icon
* Feature name
* Short description
* Open button

---

# QUIZ GENERATOR

Create a page called "AI Quiz Generator".

Inputs:

Topic:
Text input

Difficulty:
Dropdown:

* Easy
* Medium
* Hard

Number of questions:
Dropdown:

* 5
* 10

Button:

"Generate Quiz"

The frontend must send a POST request to:

${VITE_API_URL}/api/quiz

Request body:

{
"topic": "...",
"difficulty": "...",
"num_questions": 5
}

Display a loading state while waiting.

Display an error message if the API fails.

Expected response:

{
"title": "...",
"questions": [
{
"question": "...",
"options": ["...", "...", "...", "..."],
"correct_answer": "...",
"explanation": "..."
}
]
}

Display questions as attractive quiz cards.

Allow the user to select answers.

Add:

"Submit Quiz"

After submission show:

* Score
* Total questions
* Correct answers
* Explanations

Add:

"Generate New Quiz"

---

# SMART SUMMARIZER

Create a page called "Smart Summarizer".

Large textarea:

"Paste your study material here..."

Button:

"Summarize"

Send:

POST ${VITE_API_URL}/api/summarize

Request:

{
"text": "..."
}

Expected response:

{
"summary": "..."
}

Display the summary in a clean result card.

Buttons:

"Copy Summary"
"Clear"

Show loading state:

"Summarizing..."

Show a clear error message if the backend request fails.

---

# AI TUTOR

Create a page called "AI Tutor".

Heading:

"Ask EduGenie"

Description:

"Ask questions and get simple, step-by-step explanations."

Textarea/input:

"Ask your doubt..."

Optional subject dropdown:

* Computer Science
* Programming
* Mathematics
* Electronics
* General

Button:

"Ask EduGenie"

Send:

POST ${VITE_API_URL}/api/tutor

Request:

{
"question": "...",
"subject": "..."
}

Expected response:

{
"answer": "..."
}

Display the answer in a clean AI response card.

Render Markdown if it can be implemented reliably.

Show loading state:

"EduGenie is thinking..."

Show an error message if the request fails.

Add:

"Ask Another Question"

---

# SMART CONTENT STRUCTURER

Create a page called "Smart Content Structurer".

Heading:

"Organize Your Study Material"

Description:

"Turn raw notes into structured learning content."

Large textarea:

"Paste your raw notes here..."

Button:

"Structure Content"

Send:

POST ${VITE_API_URL}/api/structure

Request:

{
"text": "..."
}

Expected response:

{
"title": "...",
"topics": ["..."],
"key_points": ["..."],
"definitions": [
{
"term": "...",
"meaning": "..."
}
],
"examples": ["..."],
"summary": "..."
}

Display:

Title
Topics
Key Points
Definitions
Examples
Summary

Add an optional "View JSON" button that displays the raw JSON response in a formatted code block.

---

# API SERVICE

Create:

src/services/api.ts

Centralize all backend requests here.

Functions:

generateQuiz()
summarizeText()
askTutor()
structureContent()

Use:

VITE_API_URL

Example:

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

Do NOT put any Gemini API key in the frontend.

The frontend only communicates with the FastAPI backend.

---

# ERROR HANDLING

Every API feature must have:

* Loading state
* Success state
* Error state

Do not leave blank screens when something fails.

Use clear messages such as:

"Unable to connect to EduGenie. Please check the backend and try again."

---

# NAVIGATION

Use simple client-side routing.

Routes:

/
/dashboard
/quiz
/summarize
/tutor
/structure

All feature cards and navigation buttons should work.

---

# ENVIRONMENT VARIABLES

Create:

.env.example

with:

VITE_API_URL=http://localhost:8000

Do not include any Gemini API key in the frontend.

---

# IMPORTANT

Keep the implementation simple.

Do not create features that are not listed above.

Do not create fake AI responses.

The UI should be ready to connect to a real FastAPI backend.

Make sure there are no TypeScript errors.

Make sure all navigation works.

Make sure all buttons shown in the interface have a real purpose.

The final result should look like a polished but simple college AI project called **EduGenie**.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c81b9b93-15db-4e5c-bd55-a2f4f8177cb7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
