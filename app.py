from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from model import get_similarity
import os

# Initialize Flask app
app = Flask(__name__, static_folder='./frontend/build')
CORS(app)

# Define the recommendation endpoint
@app.route('/recommend', methods=['GET'])
def recommend():
    mal_id = request.args.get('mal_id', type=int)
    if mal_id is None:
        return jsonify({"error": "mal_id parameter is required"}), 400
    result = get_similarity(mal_id)
    return jsonify(result)

# Serve React frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# The following block is not needed for Gunicorn deployment
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(host='0.0.0.0', port=port, debug=True)
