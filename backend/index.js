import express from "express"
import cors from "cors"
import { config } from "dotenv";
import bodyParser from "body-parser";
config();

const app = express();

const corsOptions = {
    origin: "http://localhost:5173"
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

async function fetchAI(message){
    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "model": "deepseek/deepseek-r1:free",
        "messages": [
        {
            "role": "user",
            "content": message
        }
        ]
    })
    });
    let data = await response.json();
    return data;
}


 

app.get("/", async(req,res)=> {
})

app.post("/ai", async(req,res)=> {
    const message = req.body["message"];
    console.log(`Got message: ${message}`);
    const response = await fetchAI(message)
    const content = response.choices[0].message.content;
    console.log("reply: "+content);
    res.send(content);
})

app.listen(5000);