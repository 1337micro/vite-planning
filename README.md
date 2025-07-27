A Planning Poker Application for Agile teams. See LICENSE.

Click to play: http://agilepoker.online/

To run the app for production:
1. Get the .env file and place it in src/backend
2. Checkout the branch "docker"
3. docker compose up

To run the app locally for development:
1. Get the .env file and place it in src/backend
2. Open docker desktop, docker compose up, vite, nginx
3. cd .\src\backend
4. node --import=tsx .\backend.js
5. Run nginx with the nginx.conf file herein.
6. Navigate to localhost:80 (not localhost:5173)



To see db adminer: http://localhost:8080 Username is postgres. Password supplied by environment file
