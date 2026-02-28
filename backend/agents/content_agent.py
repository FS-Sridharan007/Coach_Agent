from agents.base_agent import BaseAgent
from rag.retriever import retrieve


class ContentAgent(BaseAgent):

    def __init__(self):
        super().__init__("Content Agent")

    def run(self, topic):

        prompt = f"""
        Explain the topic: {topic}
        in context of Machine Learning.
        Keep explanation educational and relevant.
        """
    
        lesson = super().run(prompt)
    
        print("[Content Agent] Lesson Generated")
    
        return lesson