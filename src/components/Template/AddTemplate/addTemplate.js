import axios from 'axios';
import React, { useState} from 'react';
import { storage } from '../../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }))

function addTemplate() {

    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [fileUploaded, setfileUploaded] = useState(false);

    async function addTemplate(e) {
        e.preventDefault();
        if(fileUploaded) {
            let template = {
                topic: topic,
                description: description,
                url: url,
            }

            await axios.post("/create-template", template)
             .then((response) => {
                console.log(response.data);
                setfileUploaded(false);
             })
             .catch((error) => {
                 console.log(error);
             });
        }
        else {
            alert('Please upload template');
        }
    }

    function onFileSelect(e) {
        setFile(e.target.files[0]);
    }

    async function uploadfile(e) {
        e.preventDefault();
        setOpen(!open);
        let bucketName = "templateFiles";
        let uploadTask = storage.ref(`${bucketName}/${file.name}`).put(file);
        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
               // alert('File Uploaded... Please Click Add Template Button');
            },
            (err) => {
                console.log(err);
            },
            () => {
                storage.ref("templateFiles").child(file.name).getDownloadURL()
                 .then((firebaseURl) => {
                    setUrl(firebaseURl);
                    console.log(firebaseURl);
                    setfileUploaded(true);
                    setOpen(false);
                 });
            }
        )
    };

    return (
        <div>

    <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        {" "}Uploading....
      </Backdrop>

        <div className="create">
        <h1>Add Template</h1>
        <form>
          <label>Template Topic</label>
          <input type="text" required
             value={topic}
             onChange={(e) => setTopic(e.target.value)}
          />
          <br />

          <label>Template Description</label>
          <input type="text" required 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <input type="file" className="uploadButton"
            onChange={onFileSelect} 
            />
          <button onClick={uploadfile}>upload Template</button>
          <br /><br />

          <button onClick={addTemplate}>Add Template</button>
        </form>
      </div>
        </div>
    )
}

export default addTemplate
