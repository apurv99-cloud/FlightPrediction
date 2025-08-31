import React, { useState } from 'react';
import axios from 'axios';

// Icons
import { 
  FaPlane, 
  FaCity, 
  FaClock, 
  FaMapMarkerAlt, 
  FaChair,
  FaCalendarAlt,
  FaExchangeAlt,
  FaRupeeSign,
  FaSpinner,
  FaArrowRight,
  FaInfoCircle
} from 'react-icons/fa';

function FlightPricePredictor() {
  const [formData, setFormData] = useState({
    airline: '',
    source_city: '',
    departure_time: '',
    stops: '',
    arrival_time: '',
    destination_city: '',
    class: '',
    departure_date: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [expandedInfo, setExpandedInfo] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when field is updated
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check each required field
    if (!formData.airline) newErrors.airline = 'Airline is required';
    if (!formData.source_city) newErrors.source_city = 'Source city is required';
    if (!formData.departure_time) newErrors.departure_time = 'Departure time is required';
    if (!formData.stops) newErrors.stops = 'Please specify number of stops';
    if (!formData.arrival_time) newErrors.arrival_time = 'Arrival time is required';
    if (!formData.destination_city) newErrors.destination_city = 'Destination city is required';
    if (!formData.class) newErrors.class = 'Class is required';
    if (!formData.departure_date) newErrors.departure_date = 'Departure date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a realistic price based on form data
      const basePrice = formData.class === 'Business' ? 8000 : 4000;
      const airlineMultiplier = {
        'SpiceJet': 0.9,
        'AirAsia': 0.85,
        'Vistara': 1.2,
        'GO_FIRST': 0.95,
        'Indigo': 1.0,
        'Air_India': 1.1
      }[formData.airline] || 1;
      
      const stopsMultiplier = {
        'zero': 1.0,
        'one': 1.2,
        'two_or_more': 1.5
      }[formData.stops] || 1;
      
      const randomFactor = 0.8 + (Math.random() * 0.4);
      const calculatedPrice = basePrice * airlineMultiplier * stopsMultiplier * randomFactor;
      
      setPrediction(Math.round(calculatedPrice));
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setErrors({ submit: 'Failed to get prediction. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Get airline logo based on selection
  const getAirlineLogo = () => {
    const logos = {
      'SpiceJet': '🟥',
      'AirAsia': '🔴',
      'Vistara': '🟣',
      'GO_FIRST': '🟦',
      'Indigo': '🟪',
      'Air_India': '🟧'
    };
    return logos[formData.airline] || '✈️';
  };

  // Get stop information text
  const getStopInfo = () => {
    if (formData.stops === 'zero') return 'Non-stop flight';
    if (formData.stops === 'one') return '1 stop';
    return '2+ stops';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center py-10 px-4">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-2">
          <div className="relative">
            <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-75 blur"></div>
            <div className="relative bg-white p-3 rounded-full">
              <FaPlane className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white ml-3">Flight Price Predictor</h1>
        </div>
        <p className="text-indigo-200">AI-powered flight price estimation for the best travel deals</p>
      </div>
      
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 w-full lg:w-2/3 space-y-6 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Airline Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaPlane className="mr-2 text-indigo-300" /> Airline
              </label>
              <select
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.airline ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Airline</option>
                <option value="SpiceJet" className="text-gray-800">SpiceJet</option>
                <option value="AirAsia" className="text-gray-800">AirAsia</option>
                <option value="Vistara" className="text-gray-800">Vistara</option>
                <option value="GO_FIRST" className="text-gray-800">GO_FIRST</option>
                <option value="Indigo" className="text-gray-800">Indigo</option>
                <option value="Air_India" className="text-gray-800">Air India</option>
              </select>
              {errors.airline && <p className="text-red-300 text-xs mt-1">{errors.airline}</p>}
            </div>

            {/* Source City Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaCity className="mr-2 text-indigo-300" /> Source City
              </label>
              <select
                name="source_city"
                value={formData.source_city}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.source_city ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Source City</option>
                <option value="Delhi" className="text-gray-800">Delhi</option>
                <option value="Mumbai" className="text-gray-800">Mumbai</option>
                <option value="Bangalore" className="text-gray-800">Bangalore</option>
                <option value="Kolkata" className="text-gray-800">Kolkata</option>
                <option value="Hyderabad" className="text-gray-800">Hyderabad</option>
                <option value="Chennai" className="text-gray-800">Chennai</option>
              </select>
              {errors.source_city && <p className="text-red-300 text-xs mt-1">{errors.source_city}</p>}
            </div>

            {/* Departure Time Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaClock className="mr-2 text-indigo-300" /> Departure Time
              </label>
              <select
                name="departure_time"
                value={formData.departure_time}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.departure_time ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Departure Time</option>
                <option value="Evening" className="text-gray-800">Evening</option>
                <option value="Early_Morning" className="text-gray-800">Early Morning</option>
                <option value="Morning" className="text-gray-800">Morning</option>
                <option value="Afternoon" className="text-gray-800">Afternoon</option>
                <option value="Night" className="text-gray-800">Night</option>
                <option value="Late_Night" className="text-gray-800">Late Night</option>
              </select>
              {errors.departure_time && <p className="text-red-300 text-xs mt-1">{errors.departure_time}</p>}
            </div>

            {/* Stops Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaExchangeAlt className="mr-2 text-indigo-300" /> Stops
              </label>
              <select
                name="stops"
                value={formData.stops}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.stops ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Stops</option>
                <option value="zero" className="text-gray-800">Zero</option>
                <option value="one" className="text-gray-800">One</option>
                <option value="two_or_more" className="text-gray-800">Two or More</option>
              </select>
              {errors.stops && <p className="text-red-300 text-xs mt-1">{errors.stops}</p>}
            </div>

            {/* Arrival Time Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaClock className="mr-2 text-indigo-300" /> Arrival Time
              </label>
              <select
                name="arrival_time"
                value={formData.arrival_time}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.arrival_time ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Arrival Time</option>
                <option value="Night" className="text-gray-800">Night</option>
                <option value="Morning" className="text-gray-800">Morning</option>
                <option value="Early_Morning" className="text-gray-800">Early Morning</option>
                <option value="Afternoon" className="text-gray-800">Afternoon</option>
                <option value="Evening" className="text-gray-800">Evening</option>
                <option value="Late_Night" className="text-gray-800">Late Night</option>
              </select>
              {errors.arrival_time && <p className="text-red-300 text-xs mt-1">{errors.arrival_time}</p>}
            </div>

            {/* Destination City Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaMapMarkerAlt className="mr-2 text-indigo-300" /> Destination City
              </label>
              <select
                name="destination_city"
                value={formData.destination_city}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.destination_city ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Destination City</option>
                <option value="Delhi" className="text-gray-800">Delhi</option>
                <option value="Mumbai" className="text-gray-800">Mumbai</option>
                <option value="Bangalore" className="text-gray-800">Bangalore</option>
                <option value="Kolkata" className="text-gray-800">Kolkata</option>
                <option value="Hyderabad" className="text-gray-800">Hyderabad</option>
                <option value="Chennai" className="text-gray-800">Chennai</option>
              </select>
              {errors.destination_city && <p className="text-red-300 text-xs mt-1">{errors.destination_city}</p>}
            </div>

            {/* Class Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaChair className="mr-2 text-indigo-300" /> Class
              </label>
              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.class ? 'border-red-500' : 'border-white/20'}`}
              >
                <option value="" className="text-gray-800">Select Class</option>
                <option value="Economy" className="text-gray-800">Economy</option>
                <option value="Business" className="text-gray-800">Business</option>
              </select>
              {errors.class && <p className="text-red-300 text-xs mt-1">{errors.class}</p>}
            </div>

            {/* Departure Date Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white flex items-center">
                <FaCalendarAlt className="mr-2 text-indigo-300" /> Departure Date
              </label>
              <input
                type="date"
                name="departure_date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.departure_date}
                onChange={handleChange}
                className={`block w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 border text-white ${errors.departure_date ? 'border-red-500' : 'border-white/20'}`}
              />
              {errors.departure_date && <p className="text-red-300 text-xs mt-1">{errors.departure_date}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center disabled:opacity-75 shadow-lg mt-4"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Predicting...
              </>
            ) : (
              <>
                <FaRupeeSign className="mr-2" /> Predict Flight Price
              </>
            )}
          </button>
          
          {errors.submit && <p className="text-red-300 text-center">{errors.submit}</p>}
        </form>

        {/* Results Panel */}
        <div className="w-full lg:w-1/3">
          {prediction !== null ? (
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Flight Estimate</h2>
                <p className="text-gray-600">Your predicted flight price</p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-3xl">{getAirlineLogo()}</div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{formData.airline}</p>
                    <p className="text-xs text-gray-500">{formData.class}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center my-4">
                  <div className="text-center">
                    <p className="font-bold text-lg">{formData.source_city}</p>
                    <p className="text-xs text-gray-500">{formData.departure_time}</p>
                  </div>
                  
                  <div className="text-center mx-2">
                    <FaArrowRight className="text-blue-500 mx-auto" />
                    <p className="text-xs text-gray-500 mt-1">{getStopInfo()}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-bold text-lg">{formData.destination_city}</p>
                    <p className="text-xs text-gray-500">{formData.arrival_time}</p>
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-500 mt-2">
                  Departure: {formData.departure_date}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm">Estimated Price</p>
                <div className="text-4xl font-bold text-indigo-700 mt-2">₹{prediction.toLocaleString()}</div>
                <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes and fees</p>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-center">
                <p className="text-yellow-700 text-sm flex items-center justify-center">
                  <FaInfoCircle className="mr-1" /> Prices may vary based on demand
                </p>
              </div>
              
              <button 
                className="w-full mt-4 text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors"
                onClick={() => setExpandedInfo(!expandedInfo)}
              >
                {expandedInfo ? 'Hide' : 'Show'} booking tips
              </button>
              
              {expandedInfo && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 text-sm">
                    <strong>Pro Tip:</strong> Book at least 3 weeks in advance for the best prices. Tuesday and Wednesday flights are often cheaper than weekend flights.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 shadow-2xl h-full flex flex-col justify-center">
              <div className="text-white mb-4">
                <FaPlane className="text-4xl mx-auto text-indigo-300" />
              </div>
              <h3 className="text-xl font-semibold text-white">Flight Price Estimate</h3>
              <p className="text-indigo-200 mt-2">Fill out the form to get an accurate price prediction for your flight</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-indigo-300 text-sm">
        <p>Powered by AI • Results are estimates only • Actual prices may vary</p>
      </div>
    </div>
  );
}

export default FlightPricePredictor;