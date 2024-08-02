const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');



const app=express();
app.use(cors());
app.use(bodyParser.json());



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'siddhiraj', 
    database: 'cms3', 
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    const query='select * from user where email=? and password=?';
    db.query(query,[email,password],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.json({success:true});
        }else{
            res.json({success:false});
        }
    });
});


app.get('/courses',(req,res)=>{
    const query='select * from course';
    db.query(query,(err,results)=>{
        if(err)throw err;
        res.json(results);
    });
});


app.post('/courses',(req,res)=>{
    const{cname,fees,duration}=req.body;
    const query='insert into course(cname,fees,duration) values (?,?,?)';
    db.query(query,[cname,fees,duration],(err,results)=>{
        if(err)throw err;
        res.json({success:true,message:'New course added succesfully'});
    });
});


app.put('/courses/:id',(req,res)=>{
    const{id}=req.params;
    const{cname,fees,duration}=req.body;
    const query='update course set cname=?,fees=?,duration=? where cid=?';
    db.query(query,[cname,fees,duration,id],(err,results)=>{
        if(err) throw err;
        res.json({success:true,message:'Course updated succesfully'});
    });
});

app.delete('/courses/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM course WHERE cid = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.json({ success: true, message: 'Course deleted successfully' });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});