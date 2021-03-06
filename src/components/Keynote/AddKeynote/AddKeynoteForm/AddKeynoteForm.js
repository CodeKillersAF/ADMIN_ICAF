import React, { useState } from "react";
import "./AddKeynoteForm.css";
import { Paper, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import { storage } from "../../../../firebase";
import { TextareaAutosize } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function KeynoteForm() {
  const history = useHistory();
  const classes = useStyles();
  const [speakerName, setspeakerName] = useState("");
  const [description, setdescription] = useState("");
  const [position, setposition] = useState("");
  const [file, setfile] = useState(null);
  const [speakerImageUrl, setspeakerImageUrl] = useState("");
  const [imageUploaded, setimageUploaded] = useState(false);
  const [emailopen, setemailopen] = useState(false);
  const [open, setOpen] = React.useState(false);

  async function addKeynote(e) {
    e.preventDefault();
    if (imageUploaded) {
      let keynote = {
        speakerName: speakerName,
        description: description,
        position: position,
        speakerImageUrl: speakerImageUrl,
      };
      console.log(keynote);

      await axios
        .post("/keynote/add-keynote", keynote)
        .then((response) => {
          console.log(response.data);
          setimageUploaded(false);
          setemailopen(!emailopen);
          axios.post("/keynote/send-mail").then((reponse) => {
            setemailopen(false);
            const path = `/pending-keynote`;
            history.push(path);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please upload an image");
    }
  }

  function onImageSelect(e) {
    setfile(e.target.files[0]);
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
            setimageUploaded(true);
            setOpen(false);
          });
      }
    );
  }

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" /> Uploading....
      </Backdrop>
      <Backdrop className={classes.backdrop} open={emailopen}>
        <CircularProgress color="inherit" /> Email sending....
      </Backdrop>
      <form onSubmit={addKeynote}>
        <Paper elevation={10} className="addnewKeynoteForm__paper">
          <h1 className="addnewKeynoteHeader">Create Keynote</h1>
          <Divider />
          <Grid className="addnewKeynotetextfield">
            <TextField
              size="medium"
              id="outlined-basic"
              label="Speaker name"
              variant="outlined"
              name="speakerName"
              valu={speakerName}
              onChange={(e) => setspeakerName(e.target.value)}
              required={true}
            />
            <TextField
              size="medium"
              id="outlined-basic"
              label="Position"
              variant="outlined"
              name="position"
              value={position}
              onChange={(e) => setposition(e.target.value)}
              required={true}
            />

            <TextareaAutosize
              rowsMax={4}
              aria-label="maximum height"
              placeholder="Description"
              className="textarea"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required={true}
            />
          </Grid>
          <input
            type="file"
            className="addnewKeynoteuploadButton"
            onChange={onImageSelect}
          />
          <Button variant="contained" color="primary" onClick={uploadFile}>
            Upload Image
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="addnewkeynotebutton"
            type="submit"
          >
            Create
          </Button>
        </Paper>
      </form>
    </div>
  );
}
