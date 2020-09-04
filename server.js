const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/api/answers", (req, res) => {
    const answersBasic = ["can you elaborate?","and why do you believe that is so?","can you be more specific?","what would be your guess?","I need more details for this one"]; 
    const answersAdvanced = ["have you check the logs?","have you tried restarting?","what does the documentation say?", "Maybe its a typo"]
    const answersAdjust = ["you need to be a bit more specific","come on I am trying to help","whatever","that does not sound like a bug"]
   
    res.json({
        answersBasic, answersAdvanced, answersAdjust
    })
})

app.get("/", (req, res) => {
    res.send("worked!")
})

app.listen(PORT, () => console.log(`app is running on port ${PORT}`))