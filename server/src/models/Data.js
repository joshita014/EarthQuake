import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    geometry: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: {
          type: [Number],
          index: '2dsphere',
        },
    },
    properties: {
      dateTime: String,
      region: String,
      magnitude: Number,
      latitude: Number,
      longitude: Number,
    },
});

export const Data = mongoose.model('data', dataSchema);


