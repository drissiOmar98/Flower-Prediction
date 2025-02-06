from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})  # Allow requests from your Angular app

# Load the saved  model
model, label_encoder = joblib.load("iris_model.pkl")

@app.route('/')
def home():
    return "Welcome to the Iris Flower Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or label_encoder is None:
        return jsonify({"error": "Model not available. Please try again later."}), 500

    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract features (assuming they are sent in a specific order)
        features = np.array(data["features"]).reshape(1, -1)  # Convert list to numpy array

        # Make prediction
        prediction = model.predict(features)[0]

        # Convert numeric prediction back to original species name
        predicted_species = label_encoder.inverse_transform([prediction])[0]

        return jsonify({"prediction": predicted_species})

    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 400

if __name__ == '__main__':
    app.run(debug=True)