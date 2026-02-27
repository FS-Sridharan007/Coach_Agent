knowledge_base = {

    "Linear Regression":
    "Linear regression predicts continuous values using line equation y = mx + b",

    "Gradient Descent":
    "Gradient descent minimizes loss by updating weights step by step",

    "Machine Learning":
    "Machine learning is a field of AI where systems learn from data",

    "Linear Algebra":
    "Linear Algebra studies vectors, matrices, vector spaces, and linear transformations. It is foundational for machine learning because ML models use matrix operations and vector computations."
}


def retrieve(topic):

    return knowledge_base.get(topic, "Basic concept explanation")