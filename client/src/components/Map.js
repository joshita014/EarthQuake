import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapButton from './MapButton';


export const Map = () => {
    const [earthquakes, setEarthquakes] = useState([]);
     

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    
    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        axios.get("http://localhost:3001/api/data")
          .then(response => {
            setEarthquakes(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    function setCircleColor(magnitude) {
        let color;
        if (magnitude < 4.5) {
            color = 'orange';
            if (magnitude < 3) {
                color = 'blue';
            }
        } else {
            color = 'red';
        }
        return color;
    }

    return (
        <div>
            <MapContainer center={[0, 0]} zoom={3} style={{ width: '100%', height: '100vh' }} >
                <TileLayer
                    attribution='Joshita Gautam &copy; <a>2023</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {earthquakes.map((earthquake, index) => (
                    <Circle
                        key={index}
                        color={setCircleColor(earthquake.properties.magnitude)}
                        center={[earthquake.properties.latitude, earthquake.properties.longitude]}
                        radius={30000}
                    >
                        <Popup>
                            <div>
                                <p>Date/Time: {earthquake.properties.dateTime}</p>
                                <p>Region: <a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(earthquake.properties.region + ' earthquake')}`}
                                    target='_blank'
                                    rel="noreferrer">{earthquake.properties.region}</a></p> 
                                <p>Magnitude: {earthquake.properties.magnitude}</p>
                            </div>
                        </Popup>
                    </Circle>
                ))}
                <MapButton />
            </MapContainer>
        </div>
    )
}
