import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ListConferenceInfo from '../../components/ConferenceInfo/ListConferenceInfo';
import { ButtonGroup } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
        height: 240,
    },
}));
export default function HomeBody() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div>

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper className={fixedHeightPaper}>
                            <h2>Editor</h2>
                            <ListConferenceInfo />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper className={fixedHeightPaper}>
                            <h2>Editor</h2>
                            <ButtonGroup>
                                <Button variant="contained" color="secondary" onClick={() => { alert('clicked') }}>
                                    Add
                                </Button>
                                <Button variant="contained" color="primary">
                                    Update
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <h2>Editor</h2>
                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </div>
    )
}