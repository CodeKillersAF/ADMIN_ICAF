import React from 'react'
import {render} from 'react-dom'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'https://icaf-api-backend.herokuapp.com/api/users';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
   
    render(<App/>,document.getElementById('app'));


