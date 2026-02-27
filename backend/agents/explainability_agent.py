from agents.base_agent import BaseAgent


class ExplainabilityAgent(BaseAgent):

    def __init__(self):
        super().__init__("Explainability Agent")

    def run(self, topic, score):

        prompt = f"""
        Topic: {topic}
        Student Score: {score}

        Explain why this topic was selected
        and why next action was taken.
        Keep explanation short and clear.
        """

        explanation = super().run(prompt)

        print("[Explainability Agent] Decision Explained")

        return explanation