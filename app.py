from flask import Flask, request, jsonify, render_template
from recommendation import MusicRecommender

app = Flask(__name__)

# Initialize the music recommender
music_recommender = MusicRecommender("data/ex.csv")

@app.route("/")
def home():
    return render_template("index.html")  # Render the frontend

@app.route('/recommend', methods=['POST'])
def recommend():
    song_name = request.form.get('song_name', '')
    if not song_name:
        return jsonify({"error": "Please provide a song name."}), 400
    recommendations = music_recommender.recommend(song_name)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True)
