import React, { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./ApprovedKeynoteTable.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ApprovedKeynoteTable() {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [keynotes, setkeynotes] = useState([]);
  const [keynoteid, setkeynoteid] = useState('');
  const [fetchondelete, setfetchondelete] = useState(false)

  const handleClickOpen = (e,keynoteID) => {
    setkeynoteid(keynoteID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  async function fetchData() {
    const req = await axios("/keynote/get-approved-keynotes");

    console.log(req.data.data);
    setkeynotes(req.data.data);
  }
  useEffect(() => {
    fetchData();
    }
    
  ,[fetchondelete,fetchData]);

  async function onClickDelete() {
    setOpen(false);
    await axios.delete("/keynote/delete-keynote/" + keynoteid);
    setkeynoteid('');
    setfetchondelete(!fetchondelete)
  }

  async function onClickNavigate(e, keynoteID) {
    const path = `/update-keynote/` + keynoteID;
    history.push(path);
  }

  return (
    <div>
      <center>
        <h1 className="approvedKeynoteHeader">Approved Keynotes</h1>
        <form>
          <input
            className="approvedSearch"
            type="search"
            placeholder="Search with speaker name"
            aria-label="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </form>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Speaker name</th>
              <th>Position</th>

              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {keynotes.filter(val=>{
            if(searchTerm===''){
              return val;
            }
            else if(val.speakerName.toLowerCase().includes(searchTerm.toLowerCase())
            ){
              return val;
            }})
        .map((keynote) => (
            <tbody>
              <td>{keynote.speakerName}</td>
              <td>{keynote.position}</td>

              <td>
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => handleClickOpen(e, keynote._id)}
                  endIcon={<DeleteIcon/>}
                >
                  Delete
                </Button>
              </td>
              <td>
              <Button
                  variant="contained"
                  color="default"
                  onClick={(e) => onClickNavigate(e, keynote._id)}
                  endIcon={<EditIcon/>}
                >
                  Edit
                </Button>
              </td>
            </tbody>
          ))}
        </table>
      </center>

      {/* dialog box */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete keynote permanent
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClickDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
