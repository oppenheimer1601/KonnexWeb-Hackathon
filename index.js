import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://kodessphere-api.vercel.app";
const teamID = "fqJgZK5"

app.use(bodyParser.urlencoded({ extended: true }));



app.post("/post", async (req, res) => {
    const parm = {teamid : teamID,device :"fan",value : 2}
    try {
      const result = await axios.post(API_URL + "/devices/",parm);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });
  app.get("/get",async (req,res)=>{
try {
    const result = await axios.get(API_URL + "/devices/");
    console.log(result);
} catch (err) {
    console.log(err)
}
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
