import React from 'react';
import axios from 'axios';
import './styles.css';


export default class AdminUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conference_detail: [],
            approved_details: []
        }
    }

    componentDidMount() {
        axios.get('/conference')
            .then(response => {
                this.setState({ approved_details: response.data.data });
            })
    }

    approve(e, id) {
        let status = {
            is_approved: true
        }
        axios.put(`/conference/update-status/${id}`, status)
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
        axios.put(`/conference/update-status/${id}`, status)
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
            <div className="container">
                <div className="container">
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} className="textStyle">
                            <div >
                                <p>Venue : {item.venue}</p>
                                <p>Dates : {item.venue_dates}</p>
                                <p>Time : {item.venue_time}</p>
                                <p>Regstration open : {item.registrationopen_date}</p>
                                <p>Regstration close : {item.lastregistration_date}</p>
                                <p>Status : {item.is_approved.toString()}</p>
                                <div>
                                    <button type="submit" className="button1" onClick={e => this.approve(e, item._id)}>Approve</button>{" "}
                                    <button type="submit" className="button2" onClick={e => this.reject(e, item._id)}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}