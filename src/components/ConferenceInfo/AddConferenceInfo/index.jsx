import React from 'react';
import axios from 'axios';

const initialState = {
    venue: '',
    venue_dates: '',
    venue_time: '',
    registrationopen_date: '',
    lastregistration_date: ''
}
export default class AddConferenceInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
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
            lastregistration_date: this.state.lastregistration_date
        };
        console.log('Data to send', conferenceinfo)
        axios.post('http://localhost:8000/api/conference-detail', conferenceinfo)
            .then(response => {
                alert('Vehicle inserted successfully')
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        return (
            <>
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

                        <br />
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>

                </div>
            </>
        )
    }
}