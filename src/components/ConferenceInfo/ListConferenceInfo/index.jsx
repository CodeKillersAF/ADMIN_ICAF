import React from 'react';
import axios from 'axios';

export default class ListConferenceInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conference_detail: [],
            approved_details: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/conference-detail')
            .then(response => {
                this.setState({ conference_detail: response.data.data }, () => {
                    let data = [];
                    this.state.conference_detail.map((item, index) => {
                        let conference_details = {
                            value: item._id,
                            venue: item.venue,
                            venue_dates: item.venue_dates,
                            venue_time: item.venue_time,
                            registrationopen_date: item.registrationopen_date,
                            lastregistration_date: item.lastregistration_date
                        }
                        if (item.is_approved) {
                            data.push(conference_details)
                        }
                    });
                    this.setState({ approved_details: data });
                })
            })
    }

    render() {
        return (
            <div>
                <h4>Conference details</h4>
                <div>
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} >
                            <div className="" >
                                <p>{item.venue}</p>
                                <p>{item.venue_dates}</p>
                                <p>{item.venue_time}</p>
                                <p>{item.registrationopen_date}</p>
                                <p>{item.lastregistration_date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}