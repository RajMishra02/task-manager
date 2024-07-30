import React, { useState, useEffect } from 'react';
import '../style/TaskReportForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskReportForm = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [task, setTask] = useState({
    title: '',
    description: '',
    date: '',
    hours: '',
    status: '',
    user: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem('user');
    const user = userId ? JSON.parse(userId) : null;

    if (!user || !user.id) {
      setError('User not logged in');
      toast.error('User not logged in');
      return;
    }
      const res = await fetch(`http://localhost:4000/api/user/getTasks?userId=${user.id}`, {
       
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log('Fetched tasks:', data); // Log data to verify it's an array
      setTasks(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    const userId = localStorage.getItem('user');
    const user = userId ? JSON.parse(userId) : null;

    if (!user || !user.id) {
      setError('User not logged in');
      toast.error('User not logged in');
      return;
    }

    if (isEditing) {
      try {
        const res = await fetch(`http://localhost:4000/api/user/updateTask/${editingTaskId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...task, user: user.id })
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        setTasks(tasks.map(t => t._id === data._id ? data : t)); // Update the task in the list
        toast.success('Task updated successfully!');
        setTask({ title: '', description: '', date: '', hours: '', status: ''}); // Reset form fields
        setIsEditing(false);
        setEditingTaskId(null);
      } catch (err) {
        console.error('Failed to update task:', err);
        setError(err.message);
        toast.error('Failed to update task');
      }
      
    } else {
      try {
        const res = await fetch('http://localhost:4000/api/user/addTasks', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, user: user.id })
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        toast.success('Task added successfully!');
        setTasks([...tasks, task]); // Add the new task to the list
      } catch (err) {
        console.error('Failed to fetch:', err);
        setError(err.message);
      }
    }


    
  };

 
  const handleEdit = (id) => {
    const taskToEdit = tasks.find(t => t._id === id);
    setTask(taskToEdit);
    setIsEditing(true);
    setEditingTaskId(id); // Set the editing task ID
  };


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
  
      setTasks(tasks.filter(task => task._id !== id));
      console.log('Task deleted successfully');
      toast.success('Task deleted successfully!');
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError(err.message);
      toast.error('Failed to delete task');
    }
  };
  

  return (
    <div className="task-report-form">
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours Worked</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={task.hours}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      </form>

      <h2>Task Reports</h2>
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Date:</strong> {task.date}</p>
              <p><strong>Hours Worked:</strong> {task.hours}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <button onClick={() => handleEdit(task._id)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default TaskReportForm;
