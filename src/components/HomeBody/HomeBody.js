import React, { useState } from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DisplayeDetails from '../DisplayDetails/DisplayeDetails';
import { useEffect } from 'react';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 270,
      
    },
    fixedWidht: {
      width: 500,
    }
  }));
export default function HomeBody() {
  

  async function fetchKeynoteCount(){
    axios.get('/keynote/count-keynotes').
    then((response)=>{
      console.log(response.data);
      setkeynotecount(response.data.count);
    })
    .catch((error)=>{
      console.log(error.message);
    })
  }

  useEffect(() => {
    fetchKeynoteCount();
  }, [fetchKeynoteCount])
  const [keynotecount, setkeynotecount] = useState(0)
  const [templatecount, settemplatecount] = useState(0)
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.fixedWidht );
    return (
        <div>
           
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>
                <DisplayeDetails title="Keynotes" count={keynotecount} linkTitle="Pending Keynotes" link='/pending-keynote'/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
              <DisplayeDetails title="Templates" count={templatecount} linkTitle="Pending Keynotes" link='/pending-keynote'/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
              <DisplayeDetails title="Attendees" count="1000" linkTitle="Pending Keynotes" link='/pending-keynote'/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Paper className={fixedHeightPaper}>
                <DisplayeDetails title="Users" count={keynotecount} linkTitle="Pending Keynotes" link='/pending-keynote'/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
              <DisplayeDetails title="Workshops" count={templatecount} linkTitle="Pending Keynotes" link='/pending-keynote'/>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
              <DisplayeDetails title="Conferences" count="1000" linkTitle="Pending Keynotes" link='/pending-keynote'/>
              </Paper>
            </Grid>
          </Grid>
         
        </Container>
        </div>
    )
}
