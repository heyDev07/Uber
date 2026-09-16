const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        const feature = response.data.features[ 0 ];
        if (feature) {
            return {
                ltd: feature.properties.lat,
                lng: feature.properties.lon
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;

    try {
        const originCoordinate = await module.exports.getAddressCoordinate(origin);
        const destinationCoordinate = await module.exports.getAddressCoordinate(destination);

        const url = `https://api.geoapify.com/v1/routing?waypoints=${originCoordinate.ltd},${originCoordinate.lng}|${destinationCoordinate.ltd},${destinationCoordinate.lng}&mode=drive&apiKey=${apiKey}`;

        const response = await axios.get(url);
        const route = response.data.features[ 0 ];

        if (!route) {
            throw new Error('No routes found');
        }

        const distanceMeters = route.properties.distance;
        const durationSeconds = route.properties.time;

        return {
            distance: {
                value: distanceMeters,
                text: `${(distanceMeters / 1000).toFixed(1)} km`
            },
            duration: {
                value: durationSeconds,
                text: `${Math.round(durationSeconds / 60)} mins`
            }
        };

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data.features.map(feature => feature.properties.formatted).filter(value => value);
    } catch (err) {
        console.error(err);
        throw new Error('Unable to fetch suggestions');
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}
