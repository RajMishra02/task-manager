import Task from "../models/task.model.js";

export const addTask = async(req, res) =>{
    const {title, description, date, hours, status,} = req.body

    const newTask = new Task({
        title,
        description,
        date,
        hours,
        status,
    })

    await newTask.save();
    res.status(200).json("Task added successfully")

}

export const getTask = async(req, res)=>{
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error: error.message });
      }
}

export const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await Task.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: "Task not found" }); 
      }
  
      res.status(200).json({ message: "Task deleted successfully" }); 
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error: error.message });
    }
  }
  