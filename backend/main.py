from fastapi import FastAPI
from orchestrator.pipeline import run_pipeline

app = FastAPI()


@app.get("/learn")

def learn(student_id: str, goal: str):

    return run_pipeline(student_id, goal)