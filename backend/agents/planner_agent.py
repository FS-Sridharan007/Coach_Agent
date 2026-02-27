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

        Select best next topic.
        """

        topic = super().run(prompt)

        print("Planner Agent Done")

        return topic