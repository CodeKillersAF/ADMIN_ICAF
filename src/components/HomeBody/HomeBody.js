import React, { useState } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import DisplayeDetails from "../DisplayDetails/DisplayeDetails";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 270,
  },
}));
export default function HomeBody() {
  const [keynotecount, setkeynotecount] = useState(0);
  const [templatecount, settemplatecount] = useState(0);
  const [attendeescount, setattendeescount] = useState(0);
  const [workshopcount, setworkshopcount] = useState(0);
  const [researchpapers, setresearchpapers] = useState(0);
  const [usercount, setusercount] = useState(0);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  async function fetchKeynoteCount() {
    axios
      .get("/keynote/count-keynotes")
      .then((response) => {
        setkeynotecount(response.data.count);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  async function fetchAttendeesCount() {
    axios.get("/get-approved-attendee-count").then((response) => {
      setattendeescount(response.data.data);
    });
  }

  async function fetchWorkshopCount() {
    axios.get("/get-approved-work-shops-count").then((response) => {
      setworkshopcount(response.data.data);
    });
  }

  async function fetchResearchCount() {
    axios.get("/get-approved-research-count").then((response) => {
      setresearchpapers(response.data.data);
    });
  }

  async function fetchTemplateCount() {
    axios.get("/template/calculate").then((response) => {
      settemplatecount(response.data.data);
    });
  }
  async function fetchUserCount() {
    axios.get("/role_manage/countuser").then((reponse) => {
      setusercount(reponse.data.data);
    });
  }

  useEffect(() => {
    fetchAttendeesCount();
    fetchKeynoteCount();
    fetchWorkshopCount();
    fetchResearchCount();
    fetchTemplateCount();
    fetchUserCount();
  }, []);

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={4}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Keynotes"
                count={keynotecount}
                linkTitle="Pending Keynotes"
                link="/pending-keynote"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Attendees"
                count={attendeescount}
                linkTitle="Approved Attendees"
                link="/home"
              />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Workshops"
                count={workshopcount}
                linkTitle="Approved Workshops"
                link="/home"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={4}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Research Papers"
                count={researchpapers}
                linkTitle="Approved Research Papers"
                link="/home"
              />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Templates"
                count={templatecount}
                linkTitle="Templates"
                link="/view-template"
              />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <DisplayeDetails
                title="Users"
                count={usercount}
                linkTitle="Users"
                link="/view-user"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
