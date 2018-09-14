
const express = require('express');
const hbs = require('hbs');
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express();

//middle wares for express and handle bars
hbs.registerPartials(__dirname+'/views/partial')//reusability of the html code
app.set('view engine','hbs')
app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
    var log = new Date().toString();
    var method=req.method;
    var url=req.url;
    console.log(`${log}:${method} ${url}`)
    
    
    fs.appendFile('server.log',`${log}:${method} ${url}\n`, function (err) {
        if (err) console.log("something went wrong!couldn't append log to file ");
        
      }); 
    next();
})

app.use((req,res,next)=>{
    res.render('maintanence.hbs')
    next();
})

//handlebar HELPERS
hbs.registerHelper('year',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('upperCase',(text)=>{
    return text.toUpperCase();
})


//application Root paths
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page :)',
        userName:'kiran',
        greeting:'Welcome to the Home page',
        
    })
})


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page!',
       
    })
})
app.get('/bad',(req,res)=>{
    res.send({
        error:'Unable to connect. Bad URL found!',
        status:'BAD'
    })
})


app.listen(port,function(){
    console.log(`Started server on port ${port}`)
})