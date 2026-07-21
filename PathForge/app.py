from flask import Flask, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

app = Flask(__name__)


# Load Dataset
career_data = pd.read_csv("data/careers.csv")

with open("data/career_info.json", "r") as file:
    career_info = json.load(file)


# Home Page
@app.route("/")
def home():
    return render_template("index.html")


# Recommendation Route
@app.route("/recommend", methods=["POST"])
def recommend():

    # Get user skills from the form
    user_skills = request.form["skills"]

    # Combine all career skills with user skills
    all_skills = career_data["Skills"].tolist()
    all_skills.append(user_skills)

    # Convert text into TF-IDF vectors
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_skills)

    # Compare user vector with career vectors
    similarity_scores = cosine_similarity(
        tfidf_matrix[-1],
        tfidf_matrix[:-1]
    )

    # Save similarity scores
    career_data["Score"] = similarity_scores.flatten()

    # Sort by highest score
    recommendations = career_data.sort_values(
        by="Score",
        ascending=False
    ).head(5)

    # Convert dataframe to list of dictionaries
    careers = []

    for _, row in recommendations.iterrows():

        name = row["Career"]

        careers.append({
            "career": name,
            "score": round(row["Score"] * 100, 2),
            "description": career_info.get(name, {}).get("description", ""),
            "salary": career_info.get(name, {}).get("salary", ""),
            "roadmap": career_info.get(name, {}).get("roadmap", [])
        })

    return render_template(
        "result.html",
        careers=careers
    )


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)