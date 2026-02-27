from agents.base_agent import BaseAgent


class PlannerAgent(BaseAgent):

    def __init__(self):
        super().__init__("Planner Agent")

    def run(self, profile, goal):

        prompt = f"""
        Student profile:
        {profile}

        Goal:
        {goal}

        Select ONLY ONE topic name.
        Return only the topic.
        No explanation.
        """

        raw_output = super().run(prompt)

        topic = raw_output.split("\n")[0].strip()

        print(f"[Planner Agent] Selected Topic: {topic}")

        return topic