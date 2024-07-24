import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import taskRoute from "./routes/task.route.js"
import cors from 'cors';
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));


app.use(express.json());
app.listen(4000,()=> (console.log("server is running on 4000")));
mongoose.connect("mongodb+srv://eshumishra260602:kFjXurbFqJaBUs27@taskmanager.ufswx0d.mongodb.net/taskManager?retryWrites=true&w=majority&appName=TaskManager" )
.then(()=>{
    console.log("MongoDB is successfully connected")
})

app.use("/api/user", userRoute);
app.use("/api/user", taskRoute);