import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://kodessphere-api.vercel.app";
const teamID = "fqJgZK5"

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.set('views', './src/views');
app.set("view engine","ejs");

let appliancesData = {
    "fanspeed":0,
    "actemp":16,
    "acstate":0,
    "bulbstate":0,
    "ledcolor":"#000000",
    "statusMessage":{"message":null,"code":"success"}
}
app.get("/",(req,res)=>{
    res.render("landing.ejs");
})
app.get("/home", async(req,res)=>{
    try {
            const result = await axios.get(API_URL + "/devices/"+teamID);
            console.log(result.data);
        
            appliancesData.fanspeed=result.data.fan;
            appliancesData.bulbstate=result.data.bulb;
            appliancesData.ledcolor=result.data.led;
            appliancesData.acstate=result.data.ac.state;
            appliancesData.actemp=result.data.ac.temp;
            console.log(appliancesData);
    }catch(error){
        console.log(error);
        appliancesData["statusMessage"]["message"] = "devices/api are offline";
    }
    res.render("index.ejs",{data:appliancesData});
})

app.post("/fan-speed", async (req, res) => {
    const speed = req.body["fan-speed"];
    const parm = {teamid : teamID,device :"fan",value : speed};
    try {
      const result = await axios.post(API_URL + "/devices/",parm);
      console.log(result.data);
      appliancesData["fanspeed"]=parseInt(speed);
      appliancesData["statusMessage"]["message"]="fan speed set successful"
      appliancesData["statusMessage"]["code"]="sucess"
      
      console.log(appliancesData);
      res.redirect("/home");
    } catch (error) {
        appliancesData["statusMessage"]["message"]="fan speed set unsuccessful"
        appliancesData["statusMessage"]["code"]="fail"
        res.redirect("/home");
    }
  });

  app.post("/bulb", async (req, res) => {
    const state = req.body["bulb"];
    const parm = {teamid : teamID,device :"bulb",value : parseInt(state)};
    console.log(state);
    try {
      const result = await axios.post(API_URL + "/devices/",parm);
      console.log(result.data);
      appliancesData["bulbstate"]=parseInt(state);
      appliancesData["statusMessage"]["message"]="bulb turned on"
      appliancesData["statusMessage"]["code"]="sucess"
      res.redirect("/home");
    } catch (error) {
      appliancesData["statusMessage"]["message"]="cannot turn on bulb"
      appliancesData["statusMessage"]["code"]="fail"
      res.redirect("/home");
    }
  });

  app.post("/led", async (req, res) => {
    const state = req.body["ledColor"];
    const parm = {teamid : teamID,device :"led",value : state};
    console.log(state);
    try {
      const result = await axios.post(API_URL + "/devices/",parm);
      console.log(result.data);
      appliancesData["ledcolor"]=state;
      appliancesData["statusMessage"]["message"]="led turned on"
      appliancesData["statusMessage"]["code"]="sucess"
      res.redirect("/home");
    } catch (error) {
      appliancesData["statusMessage"]["message"]="cannot turn on led"
      appliancesData["statusMessage"]["code"]="fail"
      res.redirect("/home");
    }
  });

  app.post("/ac", async (req, res) => {
    const acState = req.body["ac"];
    const acTemp = req.body["actemp"];
    const acVitals = {"temp":parseInt(acTemp),"state":parseInt(acState)};
    console.log(acVitals);
    const parm = {teamid : teamID,device :"ac",value : acVitals};
    try {
      const result = await axios.post(API_URL + "/devices/",parm);
      console.log(result.data);
      appliancesData["actemp"]=acVitals.temp;
      appliancesData["acstate"]=acVitals.state;
      appliancesData["statusMessage"]["message"]="ac vitals updated succesfully"
      appliancesData["statusMessage"]["code"]="sucess"

      res.redirect("/home");
    } catch (error) {
      appliancesData["statusMessage"]["message"]="ac vitals cannot be updated"
      appliancesData["statusMessage"]["code"]="fail"
      res.redirect("/home");
    }
  });

app.get("/get",async (req,res)=>{ 
try {
    const result = await axios.get(API_URL + "/devices/"+teamID);
    console.log(result);
} catch (err) {
    console.log(err);
}
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
 });
