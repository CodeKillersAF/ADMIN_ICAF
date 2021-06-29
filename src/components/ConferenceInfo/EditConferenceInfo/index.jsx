import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import {Input} from  '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

export default class EditConferenceInfo extends React.Component {

    constructor(props) {
        super(props);
    }





    render() {
        return (
            <>
                <h1>Update</h1>
                <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl>
            </>
        )
    }
}