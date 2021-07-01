import React, { useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./ApprovedKeynoteTable.css"
import { useState } from "react";
import axios from "../../../../axios";
import { useHistory } from "react-router-dom";

export default function ApprovedKeynoteTable() {

  const history = useHistory();

  const [keynotes, setkeynotes] = useState([]);


  useEffect(() => {
    
    async function fetchData (){
      
      const req = await axios('/keynotes/get-approved-keynotes');

      console.log(req.data.data);
      setkeynotes(req.data.data);
    }
    fetchData();
  })
  async function onClickNavigate(e,keynoteID){
    const path =`/update-keynote/`+keynoteID;
    history.push(path);
  }


  return (
    <div>
      <center>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Speaker name</th>
              <th>Position</th>
              
              <th>Edit</th>
              <th>Delete</th>
              
            </tr>
          </thead>

          {keynotes.map((keynote) => (
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
                  <IconButton onClick ={e=>onClickNavigate(e,keynote._id)}>
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
