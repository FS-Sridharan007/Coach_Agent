import json
import os
from datetime import datetime

PROFILE_PATH = "data/learner_profiles.json"


class LearnerModel:

    def load_profiles(self):
        if not os.path.exists(PROFILE_PATH):
            return {}
        with open(PROFILE_PATH, "r") as f:
            return json.load(f)

    def save_profiles(self, profiles):
        with open(PROFILE_PATH, "w") as f:
            json.dump(profiles, f, indent=4)

    def get_profile(self, student_id):

        profiles = self.load_profiles()

        if student_id not in profiles:
            profiles[student_id] = {
                "skills": {},
                "history": []
            }
            self.save_profiles(profiles)

        return profiles[student_id]

    def update_skill(self, student_id, topic, score):

        profiles = self.load_profiles()

        if student_id not in profiles:
            profiles[student_id] = {
                "skills": {},
                "history": []
            }

        profiles[student_id]["skills"][topic] = score

        profiles[student_id]["history"].append({
            "topic": topic,
            "score": score,
            "time": str(datetime.now())
        })

        self.save_profiles(profiles)