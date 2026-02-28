from agents.base_agent import BaseAgent


class MotivationAgent(BaseAgent):

    def __init__(self):
        super().__init__("Motivation Coach Agent")

    def run(self, score, profile):

        prompt = f"""
        Student Score: {score}
        Student History: {profile["history"]}

        Provide a short motivational message.
        If score is low → encourage improvement.
        If score improved from last attempt → praise progress.
        Keep it short and inspiring.
        """

        return super().run(prompt)