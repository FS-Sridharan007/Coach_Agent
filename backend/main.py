from fastapi import FastAPI
from pydantic import BaseModel
from orchestrator.pipeline import start_session, submit_answers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (dev mode)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StartRequest(BaseModel):
    student_id: str
    goal: str


class AnswerRequest(BaseModel):
    student_id: str
    answers: str


@app.post("/start-session")
def start(req: StartRequest):
    return start_session(req.student_id, req.goal)


@app.post("/submit-answers")
def submit(req: AnswerRequest):
    return submit_answers(req.student_id, req.answers)