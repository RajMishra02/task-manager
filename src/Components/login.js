import React, { useState } from 'react';
import '../style/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const res = await fetch('http://localhost:4000/api/user/signin', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user details and token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', document.cookie.split('access-token=')[1] || ''); // Extract token from cookies

      // Redirect to dashboard or protected route
      navigate('/Dashboard');
    } catch (err) {
      console.error('Failed to sign in:', err);
      setError(err.message);

      // Display error toasts based on error message
      if (err.message === "User doesn't exist") {
        toast.error("User doesn't exist");
      } else if (err.message === "Incorrect Password") {
        toast.error("Incorrect Password");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div>
      <h1 className='heading'>Daily Task Report Web Portal</h1>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            className="input"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="button" type="submit">Login</button>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
