import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
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
export default function WorkshopConductor() {
  let number = 0;
  const classes = useStyles();
  const [conductors, setConductors] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [workShopId, setWorkShopId] = useState("");

  const handleClickOpen = (e, id) => {
    setWorkShopId(id);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    axios
      .get("/get-all-not-approved-work-shop-conductors")
      .then((response) => {
        console.log(response.data.data);
        setConductors(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [trigger]);

  const handleApproval = (id) => {
    axios
      .put(`/set-work-shop-conductor-approved/${id}`)
      .then((response) => {
        console.log("email");
        axios
          .get(`/send-email-to-approved-work-shop/${id}`)
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
        console.log(error.message);
      });
  };

  const onDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.click();
  };

  const onDeleteHandle = () => {
    setOpen(false)
    axios
      .delete(`/delete-work-shops/${workShopId}`)
      .then((response) => {
        console.log(response.data.data);
        number = number + 1;
        setTrigger(number);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={fixedHeightPaper}>
              <center>
                <h3>Work Shop Conductors</h3>
              </center>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Approval</th>
                    <th>Download Workshop Praposal</th>
                    <th>Give approval</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                {conductors.map((conductor) => (
                  <tbody>
                    <tr key={conductor._id}>
                      <td>{conductor.first_name}</td>
                      <td>{conductor.last_name}</td>
                      <td>{conductor.email}</td>
                      <td>{conductor.phone}</td>
                      <td>{conductor.is_approved.toString()}</td>
                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          endIcon={<GetAppIcon />}
                          onClick={() => onDownload(conductor.praposal_url)}
                        >
                          Download
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleApproval(conductor._id)}
                          endIcon={<DoneIcon />}
                        >
                          Approve
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={(e) => handleClickOpen(e, conductor._id)}
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
            This will delete Research Paper permanent
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button onClick={onDeleteHandle} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
