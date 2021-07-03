import React, { useState, useEffect } from "react";
import "./UpdateKeynoteForm.css";
import { Paper, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { storage } from "../../../../firebase";
import { TextareaAutosize } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function UpdateKeynoteForm() {
  const hitstory = useHistory();
  const classes = useStyles();
  const [speakerName, setspeakerName] = useState("");
  const [description, setdescription] = useState("");
  const [position, setposition] = useState("");
  const { id } = useParams();
  const [file, setfile] = useState(null);
  const [speakerImageUrl, setspeakerImageUrl] = useState("");
  const [imageUploaded, setimageUploaded] = useState(false);
  const [open, setOpen] = React.useState(false);

  async function fetchData() {
    await axios.get("/keynote/get-keynotes/" + id).then((response) => {
      setspeakerName(response.data.data.speakerName);
      setposition(response.data.data.position);
      setdescription(response.data.data.description);
    });
  }
  
  async function uploadFile() {
    setOpen(!open);
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
            setOpen(false);
            alert("Image uploaded");
            
          });
      }
    );
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function updateKeynote(e) {
    e.preventDefault();
      if(imageUploaded)
      {
        let keynote = {
            speakerName: speakerName,
            position: position,
            description: description,
            is_approved: false,
            speakerImageUrl : speakerImageUrl
          };
      
          await axios
            .put("/keynote/update-keynote/" + id, keynote)
            .then((response) => {
              console.log("updated");
              history.go(-1);
            });
      }
      else
      {
          alert("Please upload the image");
      }
   
  }

  function onImageSelect(e) {
    console.log("dknjdnjd");
    setfile(e.target.files[0]);
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
       {" "} Uploading....
      </Backdrop>
      <form onSubmit={updateKeynote}>
      <Paper elevation={10} className="keynoteForm__paper">
        <h1 className="header">Update Keynote</h1>
        <Divider />
        <Grid className="textfield">
          <TextField
            size="medium"
            id="outlined-basic"
            label="Speaker name"
            name="speakerName"
            value={speakerName}
            onChange={(e) => setspeakerName(e.target.value)}
            required={true}
          />
          <TextField
            size="medium"
            id="outlined-basic"
            label="Position"
            name="position"
            value={position}
            onChange={(e) => setposition(e.target.value)}
            required={true}
          />
          <TextareaAutosize
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Description"
            className="uploadtextarea"
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required={true}
          />
        </Grid>
        <input type="file" className="updatekeynoteuploadButton" onChange={onImageSelect} />
        <Button variant="contained" color="primary" onClick={uploadFile}>
          Upload Image
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="updatekeynotebutton"
          type="submit"
        >
          update
        </Button>
      </Paper>
      </form>
    </div>
  );
}
