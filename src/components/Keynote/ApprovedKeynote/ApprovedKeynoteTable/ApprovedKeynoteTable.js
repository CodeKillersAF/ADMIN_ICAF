import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./ApprovedKeynoteTable.css";
import { useState } from "react";
import axios from "../../../../axios";
import { useHistory } from "react-router-dom";

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
  });
  async function onClickNavigate(e, keynoteID) {
    const path = `/update-keynote/` + keynoteID;
    history.push(path);
  }

  return (
    <div>
      <center>
        <h1 style={{color:"#3571f1"}}>Approved Keynotes</h1>
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
                <IconButton>
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
