from agents.base_agent import BaseAgent


class ProgressAgent(BaseAgent):

    def __init__(self):
        super().__init__("Progress Coach Agent")

    def run(self, profile):

        prompt = f"""
        Analyze student history:

        {profile["history"]}

        Provide:
        1. Progress summary
        2. Weak areas
        3. Improvement suggestion
        """

        return super().run(prompt)