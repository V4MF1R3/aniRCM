from flask import Flask, request, jsonify
from model import get_similarity

# Initialize Flask app
app = Flask(__name__)

# Define the recommendation endpoint
@app.route('/recommend', methods=['GET'])
def recommend():
    mal_id = request.args.get('mal_id', type=int)
    if mal_id is None:
        return jsonify({"error": "mal_id parameter is required"}), 400
    result = get_similarity(mal_id)
    return jsonify(result)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
