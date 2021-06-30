import React ,{useState,useEffect}from 'react'
import './AddKeynoteForm.css';
import { Paper, TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Divider from "@material-ui/core/Divider";
import { Button } from '@material-ui/core';
import axios from "../../../../axios"


export default function KeynoteForm() {
  const [speakerName, setspeakerName] = useState('');
  const [description, setdescription] = useState('');
  const [position, setposition] = useState('');

  async function addKeynote(){
      let keynote = {
        speakerName : speakerName,
        description: description,
        position:position
      }

      axios.post('/keynotes/add-keynote',keynote)
      .then((response)=>{
        console.log(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  }

 
    return (
      <div>
        <Paper elevation={10} className="keynoteForm__paper">
       <h1 className="header">Create Keynote</h1>
          <Divider />
          <Grid className="textfield">
            <TextField
              size="medium"
              id="outlined-basic"
              label="Speaker name"
              variant="outlined"
              name="speakerName"
              valu={speakerName}
              onChange={e=>setspeakerName( e.target.value)}
              
            />
            <TextField
              size="medium"
              id="outlined-basic"
              label="Position"
              variant="outlined"
              name="position"
              value={position}
              onChange={e=>setposition(e.target.value)}
              
            />
            <TextField
              size="medium"
              id="outlined-basic"
              label="Description"
         
              variant="outlined"
              name="description"
              value={description}
              onChange={e=>setdescription(e.target.value)}
              
            />
          </Grid>
          <input type = "file" className="uploadButton"/>
          <Button variant="contained" color="secondary" className="button"onClick={addKeynote} >
            Create
          </Button>
          </Paper>
      </div>
    )
}
