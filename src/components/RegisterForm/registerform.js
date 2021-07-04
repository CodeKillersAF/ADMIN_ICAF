import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function registerform() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
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

    await axios.post('/register-user', user)
    .then((response) => {
        console.log(user.email);
        alert(response.data.message);
        let path = '/view-user';
        history.push(path);

        axios.post('/role_manage/send-email', user)
         .then((response) => {
           alert('Email Send Successfully');
         })
         .catch((error) => {
           console.log(error);
         })
    })
    .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data.message);
    })
  };

  return (
    <div>
      <center>
      <div className="regpage">
        <div className="reg-title">Add New User</div>
        <hr />
        <form onSubmit={onRegisterClick}>
        <div class="inputs">
          {/* <label className="reg-label">Your Name</label> */}
          <input className="reg-input" type="text" required
              placeholder="Character Name"
             value={name}
             onChange={(e) => setName(e.target.value)}
          />
        </div>
          
          {/* <label className="reg-label">Your Email</label> */}
          <input className="reg-input"
           type="email" required 
           placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />

          {/* <label>Select Role</label> */}
          <select 
            required
            className="reg-input"
            placeholder="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Select a Role">Select a Role</option>
            <option value="editor">Editor</option>
            <option value="reviewer">Reviewer</option>
          </select>
 
          {/* <label className="reg-label">Username</label> */}
          <input 
          className="reg-input"
          type="text" required 
              placeholder="User-Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />

          {/* <label className="reg-label">Password</label> */}
          <input 
           className="reg-input"
          type="password" required 
             placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          <button className="reg-button">Register</button>
        </form>
        </div>
        </center>
    </div>
  );
}

export default registerform;
