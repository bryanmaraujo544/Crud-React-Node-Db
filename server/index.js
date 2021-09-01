const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')


// Here I am accessing my database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_crud'
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.get('/api/get', (req, res) => {
    const sqlSelect = 'SELECT * FROM movie_reviews;'

    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/api/insert', (req, res) => {
    const sqlInsert = 'INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?);'
    // I use question marks to say I don't want to insert constant values, I want to set dynamic values in query time

    // We are assigned the properties of the object we passed on our axios post in frontend
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    // Here I am setting to the columns the value of the variables
    db.query(sqlInsert, [movieName, movieReview])
})

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName
    const sqlDelete = 'DELETE FROM movie_reviews WHERE movie_name = ?'
    db.query(sqlDelete, name)
})

app.put('/api/update', (req, res) => {
    const name = req.body.movieName
    const review = req.body.movieReview
    console.log(name, review)
    const sqlUpdate = 'UPDATE movie_reviews SET movie_review = ? WHERE movie_name = ?'
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err)
    })
})

// Endpoint to register the new users
app.post('/api/insert/users', (req, res) => {
    const { username, email, password, imageUrl } = req.body

    const sqlInsert = 'INSERT INTO users (users_username, users_email, users_password, users_imageurl) VALUES (?,?,?,?);'
    db.query(sqlInsert, [username, email, password, imageUrl], (err, result) => {
        if (err) console.log(err)
    })
})

app.get('/api/get/users', (req, res) => {
    const sqlSelect = 'SELECT * FROM users;'
   

    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("Hello World")

})