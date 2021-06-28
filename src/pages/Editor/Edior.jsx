import React from 'react';
import axios from 'axios';


export default class EditorMain extends React.Component {

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
            <>
            <div className="card">
                <h2>Editor</h2>
                <h4 className="card-title text-secondary">Conference details</h4>
                <div>
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} >
                            <div className="p-3 back" >
                                <h4 className="card-title">{item.venue}</h4>
                                <h4 className="card-title">{item.venue_dates}</h4>
                                <h4 className="card-title">{item.venue_time}</h4>
                                <h4 className="card-title">{item.registrationopen_date}</h4>
                                <h4 className="card-title">{item.lastregistration_date}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </>
        )
    }
}