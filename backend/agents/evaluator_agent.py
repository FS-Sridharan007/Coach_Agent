from agents.base_agent import BaseAgent
from models.learner_model import LearnerModel


class EvaluatorAgent(BaseAgent):

    def __init__(self):
        super().__init__("Evaluator Agent")
        self.learner_model = LearnerModel()  # ← renamed

    def run(self, student_id, topic, quiz, answers):

        prompt = f"""
        Topic: {topic}

        Quiz:
        {quiz}

        Student Answers:
        {answers}

        Evaluate answers and give:
        1. Score out of 100
        2. Short feedback

        Return in format:
        Score: <number>
        Feedback: <text>
        """

        result = super().run(prompt)

        try:
            score_line = result.split("Score:")[1].split("\n")[0]
            score = int(score_line.strip())
        except:
            score = 50

        self.learner_model.update_skill(student_id, topic, score)

        print(f"[Evaluator Agent] Score = {score}")

        return score, result