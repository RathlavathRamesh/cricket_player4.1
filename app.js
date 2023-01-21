const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const app = express();
app.use(express.json());
const db_path = path.join(__dirname, "cricketTeam.db");
db = null;
const initializer = async () => {
  try {
    db = await open({
      filename: db_path,
      driver: sqlite3.Database,
    });
    app.listen(3003, () => {
      console.log("Server Is Running at http://localhost:3003/");
    });
  } catch (e) {
    console.log(`Db Error ${e.message}`);
    process.exit(1);
  }
};
initializer();
//GET Names API
app.get("/players/", async (request, response) => {
  console.log(request.body);
  const getNameQuary = `
      SELECT 
       *
       FROM 
       cricket_team
       ORDER BY 
       player_id;
    `;
  const nameArray = await db.all(getNameQuary);
  response.send(nameArray);
});
// ADD Player Name

app.post("/players/", async (request, response) => {
  const player_Details = request.body;
  const { playerName, jerseynumber, role } = player_Details;
  const addquary = `
  INSERT INTO 
  cricket_team(player_name,player_id,jersey_number,role)
  VALUES(
      ${playerName},
      12,
      ${jerseynumber},
      ${role};
  )
  `;
  const dbresponse = await db.run(addquary);
  response.send("Player Is added In the team");
});

module.exports = app;
