# LoL Stats
LoL Stats is a dockerised backend app which uses the Riot Games API to serve and store stats for a League of Legends player.  
Stack: Node.js, Express, Morgan, Prisma, PostgreSQL  

---

### ENV
You should create a `.env` file in the root directory of this project with the following variables:
```
RG_API_KEY=//Your Riot Games API key (https://developer.riotgames.com/)
PORT=//Port to run the express app on (3000)
NODE_ENV=//production or development
DATABASE_URL=//Your PostgreSQL database URL as defined in your docker-compose.yml (postgresql://user:password@db:5432/mydb)
POSTGRES_USER=//PostgreSQL username (user)
POSTGRES_PASSWORD=//PostgreSQL password (password)
POSTGRES_DB=//PostgreSQL database name (mydb)
```

---

### Running the app
1. Clone this repo onto your machine
2. From the root of the project run `docker compose up -d --build`
3. Call the root `/` endpoint to check if express is running correctly
> For example, if you're running locally on port 3000 perform a GET request:  
> `http://localhost:3000/`  
> and you should get a response:  
> `Success: API is working`  