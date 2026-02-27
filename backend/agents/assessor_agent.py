from agents.base_agent import BaseAgent


class AssessorAgent(BaseAgent):

    def __init__(self):
        super().__init__("Assessor Agent")

    def run(self, topic):

        prompt = f"Create 3 quiz questions on {topic}"

        quiz = super().run(prompt)

        print("Assessor Agent Done")

        return quiz