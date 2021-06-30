import React from 'react';
import axios from '../../../axios'

export default class AdminUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conference_detail: [],
            approved_details: []
        }
    }

    componentDidMount() {
        axios.get('/conference-detail')
            .then(response => {
                this.setState({ approved_details: response.data.data });
            })
    }

    // navigateUpdatePage(e, id) {
    //     window.location = `/editor/${id}`
    // }

    approve(e, id) {
        let status = {
            is_approved: true
        }
        axios.put(`/conference-detail/update-status/${id}`, status)
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
                                {/* <button type="submit" className="btn btn-primary">Approve</button> */}
                            </div>
                            <button type="submit" className="btn btn-danger" onClick={e => this.approve(e, item._id)}>Approve</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}