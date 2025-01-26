# LoL Stats
LoL Stats is a full stack app which uses the Riot Games API to get stats for a League of Legends player.
### ENV
You should create a `.env` file in the root directory of this project with the following variables:
```
PORT= // Port to run the express app on
RG_API_KEY= // Your Riot Games API key (https://developer.riotgames.com/)
NODE_ENV= // production or development
```
### Entrypoint
`app.js` is the entrypoint for this project.
Use `node app.js`to start it
Call the root `/` endpoint to check if express is running correctly
For example, if you're running locally on port 3000 perform a GET request:
`http://localhost:3000/` 
and you should get a response:
`Success: API is working`