import ollama


class BaseAgent:

    def __init__(self, name):

        self.name = name
        self.model = "llama3"

    def run(self, prompt):

        response = ollama.chat(

            model=self.model,

            messages=[
                {"role": "system", "content": f"You are {self.name}"},
                {"role": "user", "content": prompt}
            ]
        )

        return response["message"]["content"]