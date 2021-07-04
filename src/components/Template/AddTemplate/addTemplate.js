import axios from 'axios';
import React, { useState} from 'react';
import { storage } from '../../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }))

function addTemplate() {

    const history = useHistory();
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

            await axios.post("/template/create-template", template)
             .then((response) => {
                console.log(response.data);
                setfileUploaded(false);
                let path = '/view-template';
                history.push(path);
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
        <center>
    <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        {" "}Uploading....
      </Backdrop>
      
        <div className="regpage">
        <div className="reg-title">Add Template</div>
        <hr />
        <br />
        <form>
        <div class="inputs">
          <input
           className="reg-input"
           type="text" required
             value={topic}
             onChange={(e) => setTopic(e.target.value)}
             placeholder="Template Topic"
          />
          </div>
          <br />

        <textarea
          type="text" required 
             className="reg-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Template Description"
          />
          <br />

          <input type="file" className="uploadButton"
            onChange={onFileSelect} 
            />
          <button onClick={uploadfile} className="upload-button">upload Template</button>
          <br /><br />

          <button onClick={addTemplate} className="reg-button">Add Template</button>
        </form>
      </div>
      </center>
        </div>
    )
}

export default addTemplate
