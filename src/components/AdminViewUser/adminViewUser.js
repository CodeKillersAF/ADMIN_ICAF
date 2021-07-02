import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import './admintable.css';
import { green } from '@material-ui/core/colors';
import {useHistory } from 'react-router-dom';
import BuildIcon from '@material-ui/icons/Build';


export default function AdminViewUser() {
  const [state, setState] = useState([]);

  //search state
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();

  const getAllData = async () => {
    try{
      const data = await axios.get('http://localhost:8080/api/users/getAll')
      console.log(data);
      setState(data.data.data);
    }
    catch(error) {
      //console.log(error);
      alert(error.message);
    }
  }

  //admin details
  const getDataAdmin = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/users/getRole/admin"
      );
      //console.log(data.data.data);
      setState(data.data.data);
    } catch (error) {
      //console.log(error);
      alert(error.message);
    }
  };

  //editor details
  const getDataEditor = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/users/getRole/editor"
      );
      console.log(data.data.data);
      setState(data.data.data);
    } catch (error) {
      //console.log(error);
      alert(error.message);
    }
  };

  //reviewer details
  const getDataReviewer = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/users/getRole/reviewer"
      );
      //console.log(data.data.data);
      setState(data.data.data);
    } catch (error) {
      //console.log(error);
      alert(error.message);
    }
  };



  useEffect(() => {
  //delete data
  const handleDelete = (id, role) => {
    //console.log(id);
    //console.log(role);

    axios.delete(`http://localhost:8080/api/users/delete/${id}`)
     .then((response) => {
       //console.log(response.data);
       alert(response.data.data);
        if(role == "reviewer"){
          getDataReviewer()
        }
        else if(role == "editor"){
          getDataEditor();
        }
        else{
          getDataAdmin();
        }
     })
     .catch((error) => {
       //console.log(error.message);
       alert(error.message);
     })
  };
}, []);

  //update role path set
const UpdateRole = (id) => {
 // console.log(id);
  let path = `/roleChange/${id}`
  history.push(path);
}

const UpdateData = (id) => {
  let path = `/updateData/${id}`
  history.push(path);
}

//first rendering page
useEffect(() => {
  getAllData();
}, [])

  return (
    <div>
    <br /><br />
    <center>

<br />
    <input type="search" class="input-search" placeholder="Search Username" 
      onChange={(e) => {setSearchTerm(e.target.value) }}
    />
    <br /><br />
      <table className="styled-table table-bordered">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Username</th>
            <th>Delete</th>
            <th>Edit Role</th>
            <th>Edit Data</th>
        </tr>
    </thead>

    {state.filter( val => {
          if(searchTerm === '') {
            return val;
          }
          else if(
            val.username.toLowerCase().includes(searchTerm.toLowerCase())
          ){
            return val;
          }
      }
     ).map((user) => (
    <tbody>
        <tr key={user.username}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.username}</td>
            <td>
               <IconButton onClick={() => handleDelete(user._id, user.role)}> <DeleteIcon color="secondary"/> </IconButton> 
            </td>
            <td>
               <IconButton onClick={() => UpdateRole(user._id)}> <EditIcon color="primary" /> </IconButton> 
            </td>
            <td>
               <IconButton onClick={() => UpdateData(user._id)}> <BuildIcon style={{ color: green[500] }} /> </IconButton> 
            </td>
            
        </tr>
    </tbody>
    ))}
</table>
{/* </div> */}
  </center>
    </div>
  );
}
