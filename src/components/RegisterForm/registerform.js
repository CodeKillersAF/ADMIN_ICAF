import React, { useState } from "react";
import "./register.css";
import axios from "axios";

function registerform() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('editor');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterClick = async (e) => {
    e.preventDefault();

    let user = {
      name: name,
      email: email,
      role: role,
      username: username,
      password: password
    };

    //console.log(user);

    await axios.post('http://localhost:8080/api/users/register-user', user)
    .then((response) => {
        console.log(response.data);
        alert(response.data.message);
    })
    .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data.message);
    })
  };

  return (
    <div>
      <div className="create">
        <h1>Add New User</h1>
        <form onSubmit={onRegisterClick}>
          <label>Your Name</label>
          <input type="text" required
             value={name}
             onChange={(e) => setName(e.target.value)}
          />
          <br />

          <label>Your Email</label>
          <input type="email" required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label>Your Email</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="editor">Editor</option>
            <option value="reviewer">Reviewer</option>
          </select>
          <br />

          <label>Username</label>
          <input type="text" required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <label>Password</label>
          <input type="password" required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default registerform;
