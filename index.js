var exp=require('express')
var path=require('path')
var bp=require('body-parser')
var mongo=require('mongodb').MongoClient
var url="mongodb://localhost:27017"
var app=exp()

app.use(exp.static(path.join(__dirname, 'public')));

app.use(bp.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'html','Firstp.html'))
    
})

app.get("/regis",function(req,res){
    res.sendFile(path.join(__dirname,'html','first.html'))
})
app.post('/a',function(req,res){
    let  t1,t2,t3,t4,t5
    t1=req.body.a1
    t2=req.body.a2
    t3=req.body.a3
    t4=req.body.a4
    t5=req.body.a5
    

mongo.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("class");
    var query={username:t1,gender:t2,email:t3,phone:t4,password:t5}
    dbo.collection("quiz").insertOne(query,function(err,result){
        if(err) throw err;
        console.log("data inserted")
        db.close();
        
    res.sendFile(path.join(__dirname,'html','login.html'))
    })
})
})

app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname,'html','login.html'))
})

app.get('/instru',function(req,res){
    res.sendFile(path.join(__dirname,'html','instru.html'))
})

app.get('/quiz',function(req,res){
    res.sendFile(path.join(__dirname,'html','q.html'))
})

app.get('/certi',function(req,res){
    res.sendFile(path.join(__dirname,'html','certificate.html'))
})

app.get('/try',function(req,res){
    res.sendFile(path.join(__dirname,'html','2.html'))
})

app.get('/course',function(req,res){
    res.sendFile(path.join(__dirname,'html','course.html'))
})

app.get('/contact',function(req,res){
    res.sendFile(path.join(__dirname,'html','contact.html'))

})

app.get('/about',function(req,res){
    res.sendFile(path.join(__dirname,'html','about.html'))
    
})


app.post('/b',function(req,res){
    let t1,t3,t5
    t1=req.body.a1
    t3=req.body.a1
    t5=req.body.a5

mongo.connect(url,function(err,db){
    if(err) throw err;
    var dbo=db.db("class");
    var query={$and:[{$or:[{username:{$eq:t1}} ,{email:{$eq:t3}}] },{password:{$eq:t5}}]}
    dbo.collection("quiz").find(query).toArray(function(err,result){
        if(err) throw err;
        if(result.length>0){
            console.log("login succesfully")
            
     res.sendFile(path.join(__dirname,'html','front.html'))

        }
        else{
            console.log("wrong entry")
        }
        db.close();
        
      });
     
    
});
})

app.listen(1122,function(req,res){
    console.log("sever is running")
    console.log("sever is running at port 1122")

})