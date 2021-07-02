import React, { useState } from "react";
import "./AddKeynoteForm.css";
import { Paper, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import axios from "../../../../axios";
import { storage } from "../../../../firebase";
import { TextareaAutosize } from "@material-ui/core";

export default function KeynoteForm() {
  const [speakerName, setspeakerName] = useState("");
  const [description, setdescription] = useState("");
  const [position, setposition] = useState("");
  const [file, setfile] = useState(null);
  const [speakerImageUrl, setspeakerImageUrl] = useState("");
  const [imageUploaded, setimageUploaded] = useState(false);

  async function addKeynote() {

    if(imageUploaded){
      let keynote = {
        speakerName: speakerName,
        description: description,
        position: position,
        speakerImageUrl: speakerImageUrl,

      };

      await axios
      .post("/keynotes/add-keynote", keynote)
      .then((response) => {
        console.log(response.data);
        setimageUploaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
      alert('Please upload the image');
    }
      
  
    }
    
  function onImageSelect(e) {
    console.log("dknjdnjd");
    setfile(e.target.files[0]);
    
  }

  async function uploadFile() {
    let bucketName = "keynoteImages";
    let uploadTask = storage.ref(`${bucketName}/${file.name}`).put(file);
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("keynoteImages")
          .child(file.name)
          .getDownloadURL()
          .then((firebaseURl) => {
            setspeakerImageUrl(firebaseURl);
            console.log(firebaseURl);
            setimageUploaded(true);
            
          });
      }
    );
  }

  return (
    <div>
      <Paper elevation={10} className="addKeynoteForm__paper">
        <h1 className="header">Create Keynote</h1>
        <Divider />
        <Grid className="textfield">
          <TextField
            size="medium"
            id="outlined-basic"
            label="Speaker name"
            variant="outlined"
            name="speakerName"
            value={speakerName}
            onChange={(e) => setspeakerName(e.target.value)}
          />
          <TextField
            size="medium"
            id="outlined-basic"
            label="Position"
            variant="outlined"
            name="position"
            value={position}
            onChange={(e) => setposition(e.target.value)}
          />

          <TextareaAutosize
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Description"
            className="textarea"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </Grid>
        <input type="file" className="uploadButton" onChange={onImageSelect} />
        <Button
          variant="contained"
          color="primary"
          
          onClick={uploadFile}
        >
          Upload Image
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="button"
          onClick={addKeynote}
        >
          Create
        </Button>
      </Paper>
    </div>
  );
}
