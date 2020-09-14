const express = require('express');

// port 
const port = process.env.PORT || 3000;

// The app 
const app = express();

// config 
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index');
});
app.get('/homes', (req, res) => {
    const homes = [
        { title: "Two By TWo", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg" },
        { title: "Two By Three", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg" },
        { title: "Two By Four", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg" },
        { title: "Two By Five", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg" }
    ];
    res.render('home', { homes });
});

app.listen(port, () => console.log("Server Started"));