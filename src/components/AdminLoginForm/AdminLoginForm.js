import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const history = useHistory();

  const formOnSubmit = (e) => {
    e.preventDefault();
    let user = {
      username: username,
      password: password
    }
    axios.post('http://localhost:8000/api/users/login-admin', user)
    .then((response) => {
      console.log(response.data);

      const path = `/home`;
      history.push(path);
      
    })
    .catch(error => {
      console.log(error);
    })
  }


  return (
    <div className="adminLoginForm">
      <Grid>
        <Paper elevation={10} className="adminLoginForm__paper">
          <h1 className="header">ICAF</h1>
          <Divider />
          <Grid className="textfield">
            <TextField
              size="medium"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              size="medium"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <FormControlLabel
            className="checkbox"
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button variant="contained" color="secondary" className="button" onClick={formOnSubmit}>
            Login
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}
