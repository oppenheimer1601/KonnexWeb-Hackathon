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

app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.post("/post",async(req,res)=>{})

app.listen(port,()=>{console.log(`app running on port ${port}`)});