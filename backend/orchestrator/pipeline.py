from agents.profiler_agent import ProfilerAgent
from agents.planner_agent import PlannerAgent
from agents.content_agent import ContentAgent
from agents.assessor_agent import AssessorAgent
from agents.evaluator_agent import EvaluatorAgent
from agents.explainability_agent import ExplainabilityAgent
from agents.tracker_agent import TrackerAgent


def run_pipeline(student_id, goal):

    profiler = ProfilerAgent()
    planner = PlannerAgent()
    content = ContentAgent()
    assessor = AssessorAgent()
    evaluator = EvaluatorAgent()
    explain = ExplainabilityAgent()
    tracker = TrackerAgent()

    profile = profiler.run(student_id)

    topic = planner.run(profile, goal)

    lesson = content.run(topic)

    quiz = assessor.run(topic)

    score = evaluator.run(student_id, topic)

    explanation = explain.run(topic)

    tracker.run(student_id, topic, score)

    return {

        "topic": topic,
        "lesson": lesson,
        "quiz": quiz,
        "score": score,
        "explanation": explanation
    }