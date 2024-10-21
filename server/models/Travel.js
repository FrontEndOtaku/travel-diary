const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    images: [{ type: String }],
    cost: { type: Number, required: true },
    heritageSites: [{ type: String }],
    attractions: [{ type: String }],
    comfortRating: { type: Number, min: 1, max: 5 }, 
    safetyRating: { type: Number, min: 1, max: 5 },  
    createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Travel', TravelSchema);
