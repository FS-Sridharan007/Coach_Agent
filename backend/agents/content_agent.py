from agents.base_agent import BaseAgent
from rag.retriever import retrieve


class ContentAgent(BaseAgent):

    def __init__(self):
        super().__init__("Content Agent")

    def run(self, topic):

        knowledge = retrieve(topic)

        prompt = f"""
        Explain clearly:

        {knowledge}
        """

        lesson = super().run(prompt)

        print("Content Agent Done")

        return lesson