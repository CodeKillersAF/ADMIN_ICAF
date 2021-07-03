import React from 'react'
import {render} from 'react-dom'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api/users';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

render(<App/>,document.getElementById('app'));