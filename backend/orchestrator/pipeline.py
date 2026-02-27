from agents.profiler_agent import ProfilerAgent
from agents.planner_agent import PlannerAgent
from agents.content_agent import ContentAgent
from agents.assessor_agent import AssessorAgent
from agents.evaluator_agent import EvaluatorAgent
from agents.explainability_agent import ExplainabilityAgent
from agents.tracker_agent import TrackerAgent
from models.skill_tree import get_next_skill


def run_pipeline(student_id, goal):

    profiler = ProfilerAgent()
    planner = PlannerAgent()
    content = ContentAgent()
    assessor = AssessorAgent()
    evaluator = EvaluatorAgent()
    explain = ExplainabilityAgent()
    tracker = TrackerAgent()

    print("\n=== AUTONOMOUS LEARNING SESSION STARTED ===")

    profile = profiler.run(student_id)

    topic = planner.run(profile, goal)

    lesson = content.run(topic)

    quiz = assessor.run(topic)

    print("\n=== QUIZ ===")
    print(quiz)

    answers = input("\nEnter your answers: ")

    score, feedback = evaluator.run(student_id, topic, quiz, answers)

    # 🔥 AGENTIC DECISION LOGIC
    print("\n=== ADAPTIVE DECISION ENGINE ===")

    if score < 60:
        print("[Planner Agent] Low score detected. Re-teaching same topic.")

        lesson = content.run(topic)
        quiz = assessor.run(topic)

        print("\n=== REMEDIAL QUIZ ===")
        print(quiz)

    elif score > 80:
        next_topic = get_next_skill(topic, goal)

        if next_topic:
            print(f"[Planner Agent] High score! Unlocking next topic: {next_topic}")
            topic = next_topic
            lesson = content.run(topic)

        else:
            print("[Planner Agent] No further topics. Goal completed.")

    else:
        print("[Planner Agent] Moderate performance. Continue practice.")

    explanation = explain.run(topic, score)

    tracker.run(student_id, topic, score)

    return {
        "topic": topic,
        "lesson": lesson,
        "score": score,
        "feedback": feedback,
        "explanation": explanation
    }