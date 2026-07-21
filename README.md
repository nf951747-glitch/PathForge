# 🚀 PathForge AI

An AI-powered Career Recommendation System that suggests the best career paths based on a user's technical skills.

PathForge uses **TF-IDF Vectorization** and **Cosine Similarity** to compare user skills with career profiles and recommend the most suitable career paths along with descriptions, salary information, and learning roadmaps.

---

## 📸 Screenshots

### Home Page

<img width="1920" height="971" alt="image" src="https://github.com/user-attachments/assets/ab8e76ee-c557-4c20-94d6-ff6dd942fc7f" />

---

### 🎯 Recommendation Results

<img width="1920" height="976" alt="image" src="https://github.com/user-attachments/assets/f61b30c0-443c-4812-806a-baf93e0cfce2" />

---

## ✨ Features

- AI-powered career recommendations
- Modern responsive user interface
- Skill selection using interactive chips
- TF-IDF Vectorization
- Cosine Similarity matching
- Top 5 career recommendations
- Career descriptions
- Estimated salary information
- Learning roadmap
- Animated loading screen
- Professional glassmorphism UI

---

## 🧠 Recommendation Algorithm

The recommendation process follows these steps:

1. User selects technical skills.
2. Skills are converted into TF-IDF vectors.
3. Cosine Similarity compares the user's skills with every career profile.
4. Careers are ranked according to similarity score.
5. The top 5 most relevant careers are displayed.

---

## 🛠️ Technologies Used

### Backend

- Python
- Flask
- Pandas
- Scikit-learn

### Machine Learning

- TF-IDF Vectorizer
- Cosine Similarity

### Frontend

- HTML5
- CSS3
- JavaScript

---

## 📂 Project Structure

```text
PathForge/
│
├── app.py
├── requirements.txt
│
├── data/
│   ├── careers.csv
│   └── career_info.json
│
├── templates/
│   ├── index.html
│   └── result.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── images/
│
└── screenshots/
    ├── home.png
    ├── results.png
    └── loading.png
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PathForge.git
```

Move into the project directory

```bash
cd PathForge
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
python app.py
```

Open your browser and visit

```
http://localhost:5000
```

---

## 📋 Workflow

```
User Skills
      │
      ▼
TF-IDF Vectorization
      │
      ▼
Cosine Similarity
      │
      ▼
Career Ranking
      │
      ▼
Top 5 Career Recommendations
      │
      ▼
Description + Salary + Roadmap
```

---

## 🚀 Future Improvements

- User authentication
- Resume upload
- Learning resource recommendations
- Course recommendations
- Career demand trends
- AI chatbot career assistant
- Dark and light mode

---

## 👩‍💻 Author

**Noor Fatima**

BS Computer Science

Lahore Garrison University

---

## ⭐ If you like this project

Please consider giving it a **Star ⭐** on GitHub.
