from agents.base_agent import BaseAgent


class PlannerAgent(BaseAgent):

    def __init__(self):
        super().__init__("Planner Agent")

    def run(self, profile, goal):

        prompt = f"""
        You are a strict academic planner.
        profile: {profile}
    
        Goal: {goal}
    
        Choose one topic strictly related to the goal.
        Choose only from:
        - Linear Algebra
        - Linear Regression
        - Gradient Descent
        - Vectors
        - Matrices
    
        Return ONLY the topic name.
        No explanation.
        No sentences.
        Just the topic.
        """
    
        raw_output = super().run(prompt).strip()
    
        # Force clean extraction
        topic = raw_output.split("\n")[0].strip()
    
        print(f"[Planner Agent] Selected Topic: {topic}")
    
        return topic