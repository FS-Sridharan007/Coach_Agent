from agents.base_agent import BaseAgent


class ExplainabilityAgent(BaseAgent):

    def __init__(self):
        super().__init__("Explainability Agent")

    def run(self, topic):

        prompt = f"Explain why {topic} is important in learning."

        explanation = super().run(prompt)

        print("Explainability Agent Done")

        return explanation