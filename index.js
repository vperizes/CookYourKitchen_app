import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config';

const app = express();
const port = 3000;
const API_URL = "https://api.edamam.com/api/recipes/v2?type=public";
const myId = process.env.ID;
const myAPIKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", async (req, res) => {
    const inputText = req.body.ingrediants;
    try{
        const response = await axios.get(API_URL, {
            params: {
                q: inputText,
                app_id: myId,
                app_key: myAPIKey
            }
        });
        const result = response.data;
        res.render("index.ejs", {
            recipes: result,
            userInput: inputText,
        });
    }catch(error){
        res.render("index.ejs", {
            content: "Looks like there's an issue: " + error.message
        });

    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})