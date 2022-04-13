import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


  mongoose.connect("mongodb+srv://toor:toor@cluster0.mfvku.mongodb.net/LoginandRegister?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    },() =>{
        console.log("DB connected")
    })
   
    const userSchema = new mongoose.Schema({
        name: String,
        email:String,
        password:String

    })
   
    const User = new mongoose.model("User",userSchema)


//Routes

    app.post("/login", (req,res)=>{
        // res.send("Hello")
        const {   email, password} = req.body
        User.findOne({ email: email}, (err,user) =>{
            if(user){
                
                if(password == user.password){
                    res.send({message:"Login Successfully",user: user})
                }else{
                    res.send({message:"Email or Password is Incorrect"})
                }

            }else{
                res.send({message:"user not found"} )
            }
        })
    })

    app.post("/register", (req,res)=>{
        // res.send("Hello")
        // console.log(req.body)
        const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
          
            res.send({message: "User already registerd"})
        } else {
            
            const user1 = new User({
                name,
                email,
                password
            })
            console.log(user1)
            user1.save((err) => {
                
                
                if(err) {
                    console.log(err)
                    res.send(err)
                } else {
                    console.log("Works")
                    res.send( { message: "Successfully Registered"})
                }
            })
        }
    })
    
}) 


const port = process.env.PORT || 9002
app.listen(port,function()  {
    console.log("BE started at port 9002")
});



