from models.learner_model import LearnerModel


class ProfilerAgent:

    def __init__(self):
        self.model = LearnerModel()

    def run(self, student_id):

        profile = self.model.get_profile(student_id)

        print("Profiler Agent Done")

        return profile