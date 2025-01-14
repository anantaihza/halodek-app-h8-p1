const express = require('express');
const app = express();
const port = 3000;
const router = require("./routes/index");

const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.use(session({
  secret: "rahasia", // Harus ada
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true // Untuk security dari csrf attack
  }
}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})