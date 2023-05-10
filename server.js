const express = require("express")
require("dotenv").config()
const fileUpload =require("express-fileupload")
const {getUsers, addUser,loginUser}= require("./handlers/userHandler");
const{getArticles,addArticle,editArticle}= require("./handlers/articleHandler");
const { authenticateToken } = require("./middleware/authenticate");
const app = express();
require("./database/connection");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());

app.use("/uploads",express.static("uploads"));

//user
app.get('/users',authenticateToken, getUsers);
app.post('/user/add',addUser);
app.post('/user/login', loginUser);

//article
app.get('/articles',getArticles);
app.post('/article/add',addArticle);
app.put('/article/edit/:id',editArticle);

const port=8000;
app.listen(port, function(){
    console.log("Server listening on port" +port);
})