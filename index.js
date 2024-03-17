import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://kodessphere-api.vercel.app";
const teamID = "fqJgZK5"

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/post",async(req,res)=>{})