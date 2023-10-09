import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173' 
  }));
  
  // グローバル設定
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const PORT = process.env.PORT || 5000;
const newsApiKey = process.env.NEWS_API_KEY;
app.get('/articles', async (req,res) => {
    const query = req.query.q;

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${newsApiKey}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.listen(PORT, () => {console.log('Server listening on port')});
