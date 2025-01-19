import express from "express";
import axios from "axios";
import 'dotenv/config';

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

app.use(express.static('public'))

const yourUsername = process.env.YOUR_USERNAME;
const yourPassword = process.env.YOUR_PASSWORD;
const yourAPIKey = process.env.YOUR_API_KEY;
const yourBearerToken = process.env.YOUR_BEARER_TOKEN;

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    const result = response.data;
    console.log(result);
    const content = JSON.stringify(result);
    res.render("index.ejs", { content });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all/?page=2`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    const content = JSON.stringify(result);
    res.render("index.ejs", { content });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter?score=6&apiKey=${yourAPIKey}`);
    const result = response.data;
    const content = JSON.stringify(result);
    
    res.render("index.ejs", { content });
    
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/secrets/42`, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    const result = response.data;
    const content = JSON.stringify(result);
    res.render("index.ejs", { content });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("An error occurred while fetching data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
