from models.learner_model import LearnerModel


class EvaluatorAgent:

    def __init__(self):
        self.model = LearnerModel()

    def run(self, student_id, topic):

        score = 80

        self.model.update_skill(student_id, topic, score)

        print("Evaluator Agent Done")

        return score