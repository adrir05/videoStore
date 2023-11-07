# Instructions

Clone the repo to your local environment
Make sure you have installed Docker desktop app
Install on yout local machine MySQL
Create a new database in your local machine called: `videoStore`

1- Change location to the repo root directory
2- Run the commnand `docker-compose build`
3- Run the command `docker exec -it videostore-web-1 rails db:migrate
4- Run `docker-compose up` in order to start the rails server
5- On another Terminal tab, navigate to `fe/video-store` and run `npm start` (it will ask tou to run the FE on another port since port 3000 is used by the rails server)
6- app should be running now on http://localhost:3001/
