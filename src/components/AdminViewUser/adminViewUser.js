import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import './admintable.css';
import { green } from '@material-ui/core/colors';
import {useHistory } from 'react-router-dom';
import BuildIcon from '@material-ui/icons/Build';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


export default function AdminViewUser() {

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState([]);

  const [reload, setReload] = useState(false);

  const [userid, setUserId] = useState('');
  const [role, setRole] = useState('');

   //delete handle functions
   const handleClickOpen = (e,userId, role) => {
    setUserId(userId);
    setRole(role);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  //search state
  const [searchTerm, setSearchTerm] = useState('');

  const history = useHistory();

  const getAllData = async () => {
    try{
      const data = await axios.get('/role_manage/getAll')
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
        "/role_manage/getRole/admin"
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
        "/role_manage/getRole/editor"
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
        "/role_manage/getRole/reviewer"
      );
      //console.log(data.data.data);
      setState(data.data.data);
    } catch (error) {
      //console.log(error);
      alert(error.message);
    }
  };


  //delete data
  const handleDelete = () => {
    //console.log(id);
    //console.log(role);
    setOpen(false);

    axios.delete(`/role_manage/delete/${userid}`)
     .then((response) => {
       console.log(response.data);
       alert(response.data.data);
       setReload(!reload);
        if(role == "reviewer"){
          getDataReviewer();
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

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete user permanent
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    <br /><br />
    <center>
      <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={getAllData}>All Users</Button>
        <Button onClick={getDataAdmin}>Admin</Button>
        <Button onClick={getDataEditor}>Editor</Button>
        <Button onClick={getDataReviewer}>Reviewer</Button>
      </ButtonGroup>

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
               <IconButton onClick={(e) => handleClickOpen(e, user._id, user.role)}> <DeleteIcon color="secondary"/> </IconButton> 
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
