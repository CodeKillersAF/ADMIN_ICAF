import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import React , { useState } from "react";
import "./AdminLoginForm.css";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function AdminLoginForm() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const history = useHistory();


  const onFormClick =async()=>{

    let user={
      username : username,
      password : password
    }

    await axios.post('/users/login-user',user)
    .then((response)=>{
      console.log(response.data); 
      let path =`/home/`
      history.push(path);

     localStorage.setItem('token', response.data.token)
      console.log(response.data.token);
    })
    .catch((err)=>{
      console.log(err.response.data);
      alert(err.response.data.message);
    })
  }


  return (
    <div className="adminLoginForm">
      <Grid>
        <Paper elevation={10} className="adminLoginForm__paper">
          <h1 className="loginHeader">ICAF</h1>
          <Divider />
          <Grid className="AdminTextfield">
            <TextField
              size="medium"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              onChange={(e)=>setusername(e.target.value)}
            />
            <TextField
              size="medium"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
            />
          </Grid>
          <FormControlLabel
            className="checkbox"
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />

          <Button variant="contained" color="secondary" className="adminLoginButton" onClick={onFormClick}>
            Login
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}
