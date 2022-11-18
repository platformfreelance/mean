// Imports & Constants
const express = require('express')
const app = express()
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const User=require('./Models/User');
const port = 3000;
const secret = 'projectmeanstack'; 
var cors = require('cors');
var jwt = require('jsonwebtoken');

// Connect To Database
mongoose.connect('mongodb://localhost:27017/authAngular', function(err,response){
    if(err)
    console.log("Erreur de connexion avec MongoDB");

    console.log("Connexion avec succès");
})

// Add headers & Middleware
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Default API port
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/profile',(req,res)=>{

    // Verify Token
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    else{
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).send('Unauthorized request')
        }
        try{
            let payload = jwt.verify(token, secret)
            if (!payload) {
                return res.status(401).send('Unauthorized request')
            }
            else{
                // Return user data
                User.findById(payload.id,function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                        res.status(200).json(user);
                    }
                })
            }
        }
        catch(err){
            return res.status(401).send('Unauthorized request')
        }
    }
});

// Body Parser
app.use(bodyparser.json());

// Register user
app.post('/register',(req,res)=>{
    if(req.body.firstname && req.body.email && req.body.lastname && req.body.password){

    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const email=req.body.email
    const password=req.body.password

    // Test if email already exists
    User.findOne({email:email},(err,user)=>{
        if(err) return res.status(500).send('Error on the server.');
        if(user) return res.json({success:false,message:"Vous êtes déjà inscrit"});
        else{
            User.create({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password
            },(err,user)=>{
                if(err) return res.status(500).send('There was a problem registering the user.');
                token = jwt.sign({id:user._id},secret,{expiresIn:86400});
                res.set('Authorization', token);
                res.json({success:true,message:"Connexion réussie"})
            })
        }
    })}
    
    else{
        res.json({success:false,message:"Veuillez remplir tous les champs"});
    }
})

// Login user
app.post('/login',(req,res)=>{
    if(req.body.email && req.body.password){
        const email=req.body.email
        const password=req.body.password

        User.findOne({
            email:email
        },(err,user)=>{
            if(err) return res.status(500).send('Error on the server.');
            if(!user) return res.json({success:false,message:"Utilisateur non trouvé"});
            else{
                if (!user.authenticate(password)) return res.json({success:false,message:"Mot de passe incorrect"});
                else{
                    token = jwt.sign({id:user._id},secret,{expiresIn:86400});
                    res.set('Authorization', token);
                    res.json({success:true,message:"Connexion réussie"});
                }
            }
        }
        )}
        else{
            res.json({success:false,message:"Veuillez remplir tous les champs"});
        }})

 // Middleware 
app.use(cors())

 // Run API
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })