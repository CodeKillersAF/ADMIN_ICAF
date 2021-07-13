import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import KeynoteTable from '../ApprovedKeynoteTable/ApprovedKeynoteTable.js';

const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 600,
    },
  }));
export default function ApprovedKeynoteBody() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div>
           
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper}>
                <KeynoteTable/>
              </Paper>
            </Grid>
          
          </Grid>
         
        </Container>
        </div>
    )
}