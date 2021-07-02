import React from 'react';
import axios from '../../../axios'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './styles.css';

const initialState = {
    venue: '',
    venue_dates: '',
    venue_time: '',
    registrationopen_date: '',
    lastregistration_date: '',
    is_approved: ''
}

export default class EditConferenceInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get(`/conference-detail/${this.props.match.params.id}`)
            .then(response => {

                this.setState({ venue: response.data.data.venue });
                this.setState({ venue_dates: response.data.data.venue_dates });
                this.setState({ venue_time: response.data.data.venue_time });
                this.setState({ registrationopen_date: response.data.data.registrationopen_date });
                this.setState({ lastregistration_date: response.data.data.lastregistration_date });
                this.setState({ is_approved: response.data.data.is_approved });

            })
            .catch(error => {
                alert(error.message);
            })
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let conferenceinfo = {
            venue: this.state.venue,
            venue_dates: this.state.venue_dates,
            venue_time: this.state.venue_time,
            registrationopen_date: this.state.registrationopen_date,
            lastregistration_date: this.state.lastregistration_date,
            lastregistration_date: this.state.lastregistration_date,
            is_approved: this.state.is_approved

        };
        console.log('Data to send', conferenceinfo)
        axios.put('/conference-detail/' + this.props.match.params.id, conferenceinfo)
            .then(response => {
                alert('Conference detail updated successfully')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }



    render() {
        return (
            <>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper>
                                <div className="container">
                                <h2>Update Conference Details</h2>
                                <div className="container">
                                    <form onSubmit={this.onSubmit}>

                                        <div className="mb-3">
                                            <label htmlFor="venue" className="form-label">Venue</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venue"
                                                name="venue"
                                                value={this.state.venue}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="venue_dates" className="form-label">Venue_dates</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venue_dates"
                                                name="venue_dates"
                                                value={this.state.venue_dates}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="venue_time" className="form-label">Venue_time</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="venue_time"
                                                name="venue_time"
                                                value={this.state.venue_time}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="registrationopen_date" className="form-label">Registrationopen_date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="registrationopen_date"
                                                name="registrationopen_date"
                                                value={this.state.registrationopen_date}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="lastregistration_date" className="form-label">Lastregistration_date</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastregistration_date"
                                                name="lastregistration_date"
                                                value={this.state.lastregistration_date}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="is_approved" className="form-label">Is_approved</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="is_approved"
                                                name="is_approved"
                                                value={this.state.is_approved}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <br />
                                        <button type="submit" className="btn btn-primary">Submit</button>

                                    </form>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper>
                                <h4>Go to</h4>
                                <Link to="/editor">
                                    <Button variant="contained" color="secondary">
                                        View
                                    </Button>
                                </Link>
                            </Paper>
                        </Grid>

                    </Grid>

                </Container>
            </>
        )
    }
}