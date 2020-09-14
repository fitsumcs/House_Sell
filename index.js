const express = require('express');

// port 
const port = process.env.PORT || 3000;

// The app 
const app = express();

app.get("/", (req, res) => {
    res.send("Hi There");
});

app.listen(port, () => console.log("Server Started"));