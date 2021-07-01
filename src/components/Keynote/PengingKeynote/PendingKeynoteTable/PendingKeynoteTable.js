import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./PendingKeynoteTable.css";
import { useState } from "react";
import axios from "../../../../axios";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function PendingKeynoteTable() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const [keynotes, setkeynotes] = useState([]);

  async function onClickDelete(e, keynoteID) {
    await axios.delete("/keynotes/delete-keynote/" + keynoteID);
  }

  async function fetchData() {
    const req = await axios.get("/keynotes/get-pending-keynotes");
    setkeynotes(req.data.data);
  }
  async function onClickApprove(e, keynoteID) {
    let approve = {
      is_approved: true,
    };
    await axios.put("/keynotes/update-keynote/" + keynoteID, approve);
  }

  async function onClickNavigate(e, keynoteID) {
    const path = `/update-keynote/` + keynoteID;
    history.push(path);
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <center>
      <h1 style={{color:"#3571f1", fontWeight:300}}>Pending Keynotes</h1>
        <form class="container d-flex">
          <input
            className="form-control"
            style={{
              marginTop: 30,
              marginBottom: 20,
              width: "40%",
              marginLeft: 350,
            }}
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

              <th>Approve</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>

          {keynotes.filter(val=>{
            if(searchTerm===''){
              return val;
            }
            else if(val.speakerName.toLowerCase().includes(searchTerm.toLowerCase())
            ){
              return val;
            }}).map((keynote) => (
            <tbody>
              <td>{keynote.speakerName}</td>
              <td>{keynote.position}</td>

              <td>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => onClickApprove(e, keynote._id)}
                >
                  Approve
                </Button>
              </td>
              <td>
                <IconButton onClick={(e) => onClickDelete(e, keynote._id)}>
                  {" "}
                  <DeleteIcon color="secondary" />{" "}
                </IconButton>
              </td>
              <td>
                <IconButton onClick={(e) => onClickNavigate(e, keynote._id)}>
                  {" "}
                  <EditIcon color="primary" />{" "}
                </IconButton>
              </td>
            </tbody>
          ))}
        </table>
      </center>
    </div>
  );
}
