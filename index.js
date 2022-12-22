
//import dataService file from service folder
const dataservice = require('./service/daataservice')

//import jsonwebtoken
const jwt = require('jsonwebtoken')



//import express
const express = require('express')

//create  app
const app = express()

//to convert json data
app.use(express.json())


//middleware for verify the token
const jwtmiddleware = (req, res, next) => {
    console.log("router soecific middleware");
    try {
        const token = req.headers['access-token']
        const data = jwt.verify(token, "secretkey123")
        console.log(data);
        next()
    }
    catch {
        res.status(402).json({
            statusCode: 402,
            status: false,
            message: "please login first"
        })
    }

}


//register  -> store data to DB so POST method
app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno, req.body.uname, req.body.psw)
    res.status(result.statusCode).json(result)
})

//login 
app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.psw)
    res.status(result.statusCode).json(result)
})

//deposit
app.post('/deposit', jwtmiddleware, (req, res) => {                         //calling middleware function {after path}
    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//withdraw
app.post('/withdraw',jwtmiddleware, (req, res) => {
    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)
    res.status(result.statusCode).json(result)
})

//getransaction
app.get('/gettransaction',jwtmiddleware, (req, res) => {
    const result = dataservice.gettransaction(req.body.acno)
    res.status(result.statusCode).json(result)
})



//request:-
//GET
// app.get('/',(req,res)=>{
//     res.send('GET Method checking...............')
// })
// //POST
// app.post('/',(req,res)=>{
//     res.send('post Method checking...............')
// })
// //put
// app.put('/',(req,res)=>{
//     res.send('put Method checking...............')
// })
// //patch
// app.patch('/',(req,res)=>{
//     res.send('patch Method checking...............')
// })
// //delete
// app.delte('/',(req,res)=>{
//     res.send('delete Method checking...............')
// })


//set port
app.listen(3000, () => {
    console.log("server started at port number 3000");
})

