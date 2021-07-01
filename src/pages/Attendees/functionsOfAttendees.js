import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import DoneIcon from '@material-ui/icons/Done';
import "./functionsOfAttendees.css";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 610,
  },
}));
export default function Attendee() {

  const history = useHistory()
  
  let number =  0;
  
  const [attendees, setAttendees] = useState([]);
  const [trigger, setTrigger] = useState(0)


  useEffect(() => {
    axios
      .get("/get-attendees-not-approved")
      .then((response) => {
        console.log(response.data.data);
        setAttendees(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        alert(error.response.data.error);
        let path = '/home';
        history.push(path);
        console.log({ error: error.response.data.error });
      });
    }, [trigger]);

  const handleApproval = (id) => {
    axios.put(`/set-approval/${id}`)
    .then(response => {
      if(response.data.data){
        number = number + 1;
        setTrigger(number)
        console.log(response.data.data);
      }
    })
    .catch(error => {
      alert(error.response.data.error);
        let path = '/home';
        history.push(path);
        console.log({ error: error.response.data.error });
    })
  }

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={fixedHeightPaper}>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Approval</th>
                    <th>Download Bank Slip</th>
                    <th>Give approval</th>
                  </tr>
                </thead>

                {attendees.map((attendee) => (
                  <tbody>
                    <tr key={attendee._id}>
                      <td>{attendee.first_name}</td>
                      <td>{attendee.last_name}</td>
                      <td>{attendee.email}</td>
                      <td>{attendee.phone}</td>
                      <td>{attendee.is_approved.toString()}</td>
                      <td>
                        <Button variant="outlined" color="secondary" endIcon={<GetAppIcon />} >
                          Download
                        </Button>
                      </td>
                      <td>
                        <Button variant="outlined" color="primary" onClick={() => handleApproval(attendee._id)} endIcon={ <DoneIcon/> }>
                          Approve
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
