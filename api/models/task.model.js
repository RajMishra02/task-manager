import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true,
        },
        hours:{
            type: Number,
            required: true,
        },
        status:{
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            required: true
        },
        
    }
)

const Task = mongoose.model("Task", taskSchema)
export default Task;