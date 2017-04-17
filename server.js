const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const morgan=require('morgan');

mongoose.connect('mongodb://localhost:27017/finalProject',function(err)
{
    if(err)
    {
        console.log('not connected')
    }
    else{
        console.log('success on db connection');
    }
});

const app=express();
const users=require('../SeProject-Anas/app/routes/userRoutes');
const port=8081;



app.use(cors());
app.use(express.static(__dirname + '/public'));
//app.use(session({secret:"ronaldo",resave:false,saveUninitialized:true}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users',users);
//2nd field not known
//app.use('/userRoutes',userRoutes);
// frontend routes =========================================================
// route to handle all angular requests
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname +'/public/app/views/index.html')); //respond to the route request with the html file.
        });

/*app.get('/',function(req,res)
{
});*/
app.listen(port,function()
{
    console.log('Running on port '+port);
});
//27017q
