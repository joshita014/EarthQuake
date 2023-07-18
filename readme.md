Hello Guys!!,

I am delighted to share my MERN project with you. The objective of this project is to retrieve earthquake data from an API and visualize it using a map. To accomplish this, I have utilized the Leaflet library.

Please follow the steps outlined below to install and run my project:
# Installing the packages 

## Backend
cd ./server

npm install

## Frontend
cd ./client 

npm install

### If you have problem with dotenv not reading the config use this command.
npm install dotenv --save 

make an .env file inside server :  server/.env

inside .env write:-


----------------------------------------------
MONGODB_URI= ---your mongodb cluster URL---

BACKEND_PORT=3001

-----------------------------------------------

# To Run !
# Backend: 
cd ./server
npm start

# Frontend:
cd ./client
npm start


