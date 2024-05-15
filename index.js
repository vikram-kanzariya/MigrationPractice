const express= require('express');
require('dotenv').config();
require('./models/index');
// const { createUser , getUsers , getUser , oneTooneUser , getoneTooneUser , createOnetoMany , getOneToMany , createManytoMany, getManytoMany, RawQueris, FindorCreate, transactionData, updateUser } = require('./controllers/userController');

const { createUser, getUsers, getUser, updateUser, deleteUser, CreateOneToOne, getOnetoOne, createOneToMany, getOneToMany } = require('./controllers/demoController')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get("/" , (req , res) => {
  res.send("Hello World")
});


app.post("/createuser" , createUser);
app.get("/getusers" , getUsers);
app.get("/getusers/:id" , getUser);
app.post("/update-user" , updateUser);
app.get("/delete-user" , deleteUser);

app.post("/one-to-one" , CreateOneToOne);
app.get("/one-to-one" , getOnetoOne);

app.post("/one-to-many" , createOneToMany);
app.get("/one-to-many" , getOneToMany);


// app.post("/one-to-one" , oneTooneUser);
// app.get("/one-to-one" , getoneTooneUser);

// app.post("/one-to-many" , createOnetoMany);
// app.get("/one-to-many" , getOneToMany);


// app.post("/many-to-many" , createManytoMany)
// app.get("/many-to-many" , getManytoMany)

// app.get("/query" , RawQueris);

// app.all("/find" , FindorCreate);

// app.get("/transaction" , transactionData);

app.listen(8088 , () => {
  console.log(`Working on Port: 8088`);
})