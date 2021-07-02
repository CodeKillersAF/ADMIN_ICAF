import React, { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./ApprovedKeynoteTable.css";
import { useState } from "react";
import axios from "../../../../axios";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function ApprovedKeynoteTable() {
  const history = useHistory();

  const [searchTerm, setSearchTerm] = useState('');
  const [keynotes, setkeynotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios("/keynotes/get-approved-keynotes");

      console.log(req.data.data);
      setkeynotes(req.data.data);
    }
    fetchData();
  },[onClickDelete]);

  async function onClickDelete(e, keynoteID) {
    await axios.delete("/keynotes/delete-keynote/" + keynoteID);
  }

  async function onClickNavigate(e, keynoteID) {
    const path = `/update-keynote/` + keynoteID;
    history.push(path);
  }

  return (
    <div>
      <center>
        <h1 className="approvedKeynoteHeader">Approved Keynotes</h1>
        <form class="container d-flex">
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
                  onClick={(e) => onClickDelete(e, keynote._id)}
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
    </div>
  );
}
