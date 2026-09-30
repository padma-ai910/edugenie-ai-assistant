import os
import json

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
load_dotenv()

app = FastAPI(title="EduGenie API")


class QuizRequest(BaseModel):
    study_material: str
    difficulty: str = "medium"
    num_questions: int = 5


class SummarizeRequest(BaseModel):
    text: str


class TutorRequest(BaseModel):
    question: str
    subject: str


class StructureRequest(BaseModel):
    text: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


@app.post("/api/summarize")
def summarize_text(request: SummarizeRequest):
    try:
        prompt = f"""
Summarize the following study notes clearly and concisely.

Study notes:
{request.text}

Return ONLY valid JSON in this exact format:
{{
    "summary": "Your concise summary here"
}}
"""

        interaction = client.interactions.create(
            model="gemini-3.5-flash-lite",
            input=prompt
        )

        text = interaction.output_text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        result = json.loads(text)

        return result

    except Exception as e:
        print("SUMMARIZE ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "EduGenie backend is running"
    }


@app.get("/test-gemini")
def test_gemini():
    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input="Say hello to EduGenie in one short sentence."
    )

    return {
        "message": interaction.output_text
    }

@app.post("/api/quiz")
def generate_quiz(request: QuizRequest):
    try:
        prompt = f"""
You are EduGenie, an AI quiz generator.

Create a multiple-choice quiz based ONLY on the study material provided below.

Study material:
{request.study_material}

Difficulty:
{request.difficulty}

Number of questions:
{request.num_questions}

For every question:
- Create the question from the provided study material.
- Generate exactly four plausible multiple-choice options.
- Generate exactly one correct answer.
- Make all distractors relevant to the provided study material.
- Do not use unrelated or generic information.
- Provide a short explanation for the correct answer.

Return ONLY valid JSON in this exact format:
{{
    "title": "Quiz title",
    "questions": [
        {{
            "question": "Question text",
            "options": [
                "Option A",
                "Option B",
                "Option C",
                "Option D"
            ],
            "correct_answer": "Correct option",
            "explanation": "Short explanation"
        }}
    ]
}}

Keep every question and option grounded in the provided study material.
"""

        interaction = client.interactions.create(
            model="gemini-3.5-flash-lite",
            input=prompt
        )

        text = interaction.output_text.strip()

        print("GEMINI RAW RESPONSE:", text)

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        quiz = json.loads(text)

        return quiz

    except Exception as e:
        print("QUIZ ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
@app.post("/api/tutor")
def tutor_question(request: TutorRequest):
    try:
        prompt = f"""
You are EduGenie, an AI tutor for college students.

Subject: {request.subject}

Student question:
{request.question}

Explain the answer clearly and simply.

Follow this structure:
1. Direct answer
2. Step-by-step explanation
3. Simple example
4. Key takeaway

Use beginner-friendly language and avoid unnecessary complexity.

Return ONLY valid JSON in this exact format:
{{
    "answer": "Your complete explanation here"
}}
"""

        interaction = client.interactions.create(
            model="gemini-3.5-flash-lite",
            input=prompt
        )

        text = interaction.output_text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        result = json.loads(text)

        return result

    except Exception as e:
        print("TUTOR ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
@app.post("/api/structure")
def structure_content(request: StructureRequest):
    try:
        prompt = f"""
You are EduGenie, an AI study assistant.

Analyze the following study material and organize it into useful learning sections.

Study material:
{request.text}

Return ONLY valid JSON in this exact format:
{{
    "title": "A suitable title",
    "topics": ["Topic 1", "Topic 2"],
    "key_points": [
        "Important point 1",
        "Important point 2"
    ],
    "definitions": [
        {{
            "term": "Term",
            "meaning": "Meaning"
        }}
    ],
    "examples": [
        "Example 1"
    ],
    "summary": "A concise summary"
}}

Keep the information based on the provided study material.
Do not invent unrelated information.
"""

        interaction = client.interactions.create(
            model="gemini-3.5-flash-lite",
            input=prompt
        )

        text = interaction.output_text.strip()

        if text.startswith("```"):
            text = text.replace("```json", "").replace("```", "").strip()

        result = json.loads(text)

        return result

    except Exception as e:
        print("STRUCTURE ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )