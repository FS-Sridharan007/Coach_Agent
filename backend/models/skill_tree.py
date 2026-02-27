SKILL_TREE = {
    "Machine Learning": [
        "Linear Algebra",
        "Linear Regression",
        "Gradient Descent"
    ],

    "Linear Algebra": [
        "Vectors",
        "Matrices"
    ]
}


def get_next_skill(current_topic, goal):

    if current_topic in SKILL_TREE:
        return SKILL_TREE[current_topic][0]

    if goal in SKILL_TREE:
        return SKILL_TREE[goal][0]

    return None