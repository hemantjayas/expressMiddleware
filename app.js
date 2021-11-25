const express = require("express");

const app = express();


const books = require('./books.json');

app.use(express.json());
const logger = (req, res, next) => {
    req.name = 'Hemant jayas';
    next()
}


app.use(logger);


app.get("/", (req, res) => {

    res.send({ "Api requested by": req.name, books })
});


app.get("/books/:id", (req, res) => {
    const Book = books.filter((book) => book.id === Number(req.params.id));

    res.send({ "Api requested by": req.name, "book": Book[0] })
});

app.post("/books", (req, res) => {
    const newBook = [...books, req.body];

    res.send(newBook)
});




app.patch("/books/:id", (req, res) => {

    const neWBook = books.map((user) => {
        if (Number(req.params.id) === user.id) {
            if (req?.body?.id) {
                user.id = Number(req.body.id)
            }
            if (req?.body?.author) {
                user.author = req.body.author
            }
            if (req?.body?.year) {
                user.year = Number(req.body.year)
            }
            if (req?.body?.pages) {
                user.pages = Number(req.body.pages)
            }
            if (req?.body?.book_name) {
                user.book_name = req.body.book_name
            }
        }
        return user
    })

    res.send(neWBook)

});




app.delete("/books/:id", (req, res) => {

    const neWBook = books.filter((user) => user.id !== Number(req.params.id))

    res.send(neWBook)

});



app.listen(5000, function () {
    console.log('listening to port 5000');
})