import express from 'express';
import axios from 'axios';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Data } from './models/Data.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true  
});
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to database');
});

app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');

        const data = response.data.Infogempa.gempa.map((item) => ({
          geometry: {
              type: "Point", 
              coordinates: [parseFloat(item.Coordinates.split(",")[1]), parseFloat(item.Coordinates.split(",")[0])],
          },
          properties: {
            dateTime: item.DateTime,
            region: item.Wilayah,
            magnitude: parseFloat(item.Magnitude),
            latitude: parseFloat(item.Lintang),
            longitude: parseFloat(item.Bujur),
          },
        }));

        for (const item of data) {
            const existingData = await Data.findOne({ 
                'properties.dateTime': item.properties.dateTime,
                'properties.region': item.properties.region, 
            });
          
            if (!existingData) {
              const newData = new Data(item);
              try {
                await newData.save();
              } catch (error) {
                console.error('Error saving data:', error);
              }
            }
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching and storing data: " + error });
    }
});

app.listen(process.env.BACKEND_PORT, () => {
    console.log('SERVER STARTED!');
});
