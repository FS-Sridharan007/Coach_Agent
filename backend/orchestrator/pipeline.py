from agents.profiler_agent import ProfilerAgent
from agents.planner_agent import PlannerAgent
from agents.content_agent import ContentAgent
from agents.assessor_agent import AssessorAgent
from agents.evaluator_agent import EvaluatorAgent
from agents.explainability_agent import ExplainabilityAgent
from agents.tracker_agent import TrackerAgent
from agents.progress_agent import ProgressAgent
from agents.motivation_agent import MotivationAgent
from models.skill_tree import get_next_skill

# Temporary session store (in-memory)
SESSION_STORE = {}


def start_session(student_id, goal):

    profiler = ProfilerAgent()
    planner = PlannerAgent()
    content = ContentAgent()
    assessor = AssessorAgent()

    profile = profiler.run(student_id)

    topic = planner.run(profile, goal)

    lesson = content.run(topic)

    quiz = assessor.run(topic)

    # Save session data
    SESSION_STORE[student_id] = {
        "goal": goal,
        "topic": topic,
        "quiz": quiz
    }

    return {
        "topic": topic,
        "lesson": lesson,
        "quiz": quiz
    }


def submit_answers(student_id, answers):

    evaluator = EvaluatorAgent()
    explain = ExplainabilityAgent()
    tracker = TrackerAgent()
    progress = ProgressAgent()
    motivation = MotivationAgent()

    session = SESSION_STORE.get(student_id)

    if not session:
        return {"error": "Session not found. Start session first."}

    topic = session["topic"]
    quiz = session["quiz"]
    goal = session["goal"]

    score, feedback = evaluator.run(student_id, topic, quiz, answers)

    # Adaptive Decision
    if score < 60:
        next_action = "Remedial - Relearn Same Topic"
    elif score > 80:
        next_topic = get_next_skill(topic, goal)
        next_action = f"Unlocked Next Topic: {next_topic}" if next_topic else "Goal Completed"
    else:
        next_action = "Practice More"

    profile = evaluator.learner_model.get_profile(student_id)

    explanation = explain.run(topic, score)
    progress_report = progress.run(profile)
    motivation_message = motivation.run(score, profile)

    tracker.run(student_id, topic, score)

    return {
        "score": score,
        "feedback": feedback,
        "next_action": next_action,
        "explanation": explanation,
        "progress_report": progress_report,
        "motivation": motivation_message,
        "profile": profile
    }