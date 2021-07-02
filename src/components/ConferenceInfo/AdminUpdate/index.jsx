import React from 'react';
import axios from 'axios';

export default class AdminUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conference_detail: [],
            approved_details: []
        }
    }

    componentDidMount() {
        axios.get('/')
            .then(response => {
                this.setState({ approved_details: response.data.data });
            })
    }

    approve(e, id) {
        let status = {
            is_approved: true
        }
        axios.put(`/update-status/${id}`, status)
            .then(response => {
                alert('Conference status approved!')
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    reject(e, id) {
        let status = {
            is_approved: false
        }
        axios.put(`/update-status/${id}`, status)
            .then(response => {
                alert('Conference status rejected!')
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" >
                                <h5>Venue : {item.venue}</h5>
                                <h5>Dates : {item.venue_dates}</h5>
                                <h5>Time : {item.venue_time}</h5>
                                <h5>Regstration open : {item.registrationopen_date}</h5>
                                <h5>Regstration close : {item.lastregistration_date}</h5>
                                <h5>Status : {item.is_approved.toString()}</h5>
                                <button type="submit" className="btn btn-primary" onClick={e => this.approve(e, item._id)}>Approve</button>{" "}
                                <button type="submit" className="btn btn-danger" onClick={e => this.reject(e, item._id)}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}