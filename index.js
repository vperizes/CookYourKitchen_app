import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import "dotenv/config";
import { makeRequest } from "./public/avoidSpinDown.js";

const app = express();
const port = 3000;
const API_URL = "https://api.edamam.com/api/recipes/v2?type=public";
const myId = process.env.ID;
const myAPIKey = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let nextPageUrl = null;
const year = new Date().getFullYear();

app.get("/", (req, res) => {
  res.render("index.ejs", {
    year: year,
  });
});

app.post("/search", async (req, res) => {
  const inputText = req.body.ingredients;
  try {
    const requestUrl = nextPageUrl || API_URL;

    const response = await axios.get(requestUrl, {
      params: {
        q: inputText,
        app_id: myId,
        app_key: myAPIKey,
      },
    });
    const result = response.data;

    //store next page url for pagination
    if (result._links.next.href) {
      nextPageUrl = result._links.next.href;
    } else {
      nextPageUrl = null; //no more pages/recipes given the user search
    }

    res.render("index.ejs", {
      recipes: result,
      userInput: inputText,
      nextPageUrl: nextPageUrl,
      year: year,
    });
  } catch (error) {
    res.render("index.ejs", {
      content: "Looks like there's an issue: " + error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

// Call request function every 14.5 minutes to avid server spin down
setTimeout(makeRequest, 1000 * 62 * 14);
