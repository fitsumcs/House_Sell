const express = require('express');
const bodyParser = require('body-parser');
// port 
const port = process.env.PORT || 3000;

// fake data 
const homes = [
    { title: "Two By TWo", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg", price: 35000, city: "Addis Ababa", location: "Bole" },
    { title: "Two By TWo", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg", price: 35000, city: "Addis Ababa", location: "Bole" },
    { title: "Two By TWo", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg", price: 35000, city: "Addis Ababa", location: "Bole" },
    { title: "Two By TWo", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg", price: 35000, city: "Addis Ababa", location: "Bole" },
    { title: "Two By TWo", image: "https://image.shutterstock.com/image-photo/young-man-sale-board-selling-260nw-730777636.jpg", price: 35000, city: "Addis Ababa", location: "Bole" },
];
// The app 
const app = express();

// config 
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('index');
});
app.get('/houses', (req, res) => {
    res.render('home', { homes });
});
// new house form view
app.get('/houses/new', (req, res) => {
    res.render('newHouse');
});
// add new house 
app.post('/houses', (req, res) => {

    //grab data from form 
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const city = req.body.city;
    const location = req.body.location;
    const data = { title, image, price, city, location };
    homes.push(data);
    res.redirect('/houses');

});
app.listen(port, () => console.log("Server Started"));