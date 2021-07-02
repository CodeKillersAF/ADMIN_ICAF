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
        axios.get('/')
            .then(response => {
                this.setState({ approved_details: response.data.data });
            })
    }

    navigateUpdatePage(e, id) {
        window.location = `/editor/${id}`
    }

    removeInfo(e, id) {
        axios.delete(`/${id}`)
    }


    render() {
        return (
            <div>
                <div>
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} className="card mb-3">
                            <div className="p-3" onClick={e => this.navigateUpdatePage(e, item._id)}>
                                <h5>Venue : {item.venue}</h5>
                                <h5>Dates : {item.venue_dates}</h5>
                                <h5>Time : {item.venue_time}</h5>
                                <h5>Regstration open : {item.registrationopen_date}</h5>
                                <h5>Regstration close : {item.lastregistration_date}</h5>
                                <h5>Status : {item.is_approved.toString()}</h5>
                                {/* <button type="submit" className="btn btn-primary">Approve</button> */}
                            </div>
                            <button type="submit" className="btn btn-danger" onClick={e => this.removeInfo(e, item._id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}