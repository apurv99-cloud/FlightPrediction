import joblib
import os

MODEL_PATH = os.environ.get("MODEL_PATH", "/app/model.pkl")

def load_model():
    # use joblib for scikit-learn objects (faster + safer)
    model = joblib.load(MODEL_PATH)
    return model
