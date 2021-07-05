import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import "./functionsOfAttendees.css";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const history = useHistory();

  let number = 0;

  const [attendees, setAttendees] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [attendeeId, setAttendeeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleClickOpen = (e, id) => {
    setAttendeeId(id);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        let path = "/home";
        history.push(path);
        console.log({ error: error.response.data.error });
      });
  }, [trigger]);

  const handleApproval = (id) => {
    axios
      .put(`/set-approval/${id}`)
      .then((response) => {
        console.log("email");
        axios
          .get(`/send-email-to-approved-attendee/${id}`)
          .then((response) => {
            console.log(response.data.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
        number = number + 1;
        setTrigger(number);
        console.log(response.data.data);
      })
      .catch((error) => {
        alert(error.response.data.error);
        let path = "/home";
        history.push(path);
        console.log({ error: error.response.data.error });
      });
  };

  const onDownload = (url) => {
    console.log("download");
    const link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const onDeleteHandlle = () => {
    setOpen(false);
    axios
      .delete(`delete-attendee/${attendeeId}`)
      .then((response) => {
        console.log(response.data.data);
        number = number + 1;
        setTrigger(number);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={fixedHeightPaper}>
              <center>
                <h2 style={{color:"#3F51B5",  fontSize:40}}>Attendees</h2>
              </center>
              <input
                type="search"
                //class="input-search"
                placeholder="Search Username"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
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
                    <th>Delete</th>
                  </tr>
                </thead>

                {attendees
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.first_name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((attendee) => (
                    <tbody>
                      <tr key={attendee._id}>
                        <td>{attendee.first_name}</td>
                        <td>{attendee.last_name}</td>
                        <td>{attendee.email}</td>
                        <td>{attendee.phone}</td>
                        <td>{attendee.is_approved.toString()}</td>
                        <td>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => onDownload(attendee.bank_slip_url)}
                            endIcon={<GetAppIcon />}
                          >
                            Download
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleApproval(attendee._id)}
                            endIcon={<DoneIcon />}
                          >
                            Approve
                          </Button>
                        </td>
                        <td>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={(e) => handleClickOpen(e, attendee._id)}
                            endIcon={<DeleteIcon />}
                          >
                            Delete
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete Attendee permanent
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={onDeleteHandlle} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
