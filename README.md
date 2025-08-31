# Flight Price Prediction

This project predicts flight ticket prices based on user input such as airline, source/destination city, departure/arrival time, stops, class, and date. It consists of a Python backend (Flask + scikit-learn) and a ReactJS frontend styled with Tailwind CSS.

---

## Features

### Backend (`app.py`)
- Trained machine learning model ([model.pkl](model.pkl)) for flight price prediction.
- REST API built with Flask to serve predictions.
- Input validation and error handling.
- Easily retrain model with new data.

### Frontend ([flight-prediction/src/App.jsx](flight-prediction/src/App.jsx))
- Modern, responsive UI built with ReactJS and Tailwind CSS.
- Form for entering flight details:
  - Airline, source/destination city, departure/arrival time, stops, class, and date.
- Real-time validation and helpful error messages.
- Displays predicted price with breakdown and booking tips.
- Loading spinner and feedback for API calls.

---

## Tech Stack

- **Python**: Backend, model training
- **Flask**: REST API
- **scikit-learn**: Machine learning
- **ReactJS**: Frontend UI ([flight-prediction/src/App.jsx](flight-prediction/src/App.jsx))
- **Tailwind CSS**: Styling ([flight-prediction/src/index.css](flight-prediction/src/index.css))
- **Vite**: Frontend tooling ([flight-prediction/vite.config.js](flight-prediction/vite.config.js))

---

## Getting Started

### Backend

1. Install Python dependencies:
    ```sh
    pip install -r requirements.txt
    ```
2. Run the Flask server:
    ```sh
    python app.py
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd flight-prediction
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm run dev
    ```

---

## Usage

1. Open the frontend in your browser (`localhost:5173` by default).
2. Fill out the flight details form.
3. Click "Predict Flight Price" to get an estimate.
4. View the predicted price, breakdown, and booking tips.

---

## Project Structure

```
app.py                        
model.pkl                    
requirements.txt            
Flight Price Prediction Using Python.ipynb # Model training notebook
README.md                    
flight-prediction/
  ├── src/
  │   ├── App.jsx            
  │   ├── App.css            
  │   ├── index.css          
  │   ├── main.jsx          
  ├── index.html           
  ├── package.json           
  ├── tailwind.config.js     
  ├── vite.config.js         
  ├── eslint.config.js       
  └── postcss.config.js      
```

---

## Example API Request

```json
POST /predict
{
  "airline": "Indigo",
  "source_city": "Delhi",
  "departure_time": "Morning",
  "stops": "zero",
  "arrival_time": "Afternoon",
  "destination_city": "Mumbai",
  "class": "Economy",
  "departure_date": "2024-07-01"
}
```

---

## Acknowledgements

- Inspired by various flight price prediction models and APIs.
- Thanks to contributors of the used libraries and frameworks.

---
