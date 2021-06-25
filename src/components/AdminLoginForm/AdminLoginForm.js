import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import React from "react";
import "./AdminLoginForm.css";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";

export default function AdminLoginForm() {

  const history = useHistory();

  const onClick =()=>{
    let path =`/dashboard`
    history.push(path);
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
            />
            <TextField
              size="medium"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <FormControlLabel
            className="checkbox"
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button variant="contained" color="secondary" className="button" onClick={onClick}>
            Login
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}
