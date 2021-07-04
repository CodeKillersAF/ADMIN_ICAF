import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
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

function edittemplate() {

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

    const history = useHistory();
    const params = useParams();

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState('');
    const [fileuploaded, setfileUploaded] = useState(false);

    async function getSelectedData() {
        await axios.get(`/template/findtemplate/${params.id}`)
         .then((response) => {
             setTopic(response.data.data.topic);
             setDescription(response.data.data.description);
         })
    }

useEffect(() => {
    getSelectedData()
}, []);

async function uploadfile(e) {
    e.preventDefault();
    setOpen(true);
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
    );
  }

  async function updateTemplate(e) {
      e.preventDefault();
    if(fileuploaded)
    {
      let template = {
        topic: topic,
        description: description,
        url: url,
    };
    
        await axios
          .put(`/template/update/${params.id}`, template)
          .then((response) => {
            console.log("Template updated");
            let path = '/view-template';
            history.push(path);
          });
    }
    else
    {
        alert("Please upload template");
    }
 
}

function onFileSelect(e) {
    setFile(e.target.files[0]);
  }

    return (
        <div>
      <center>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        {" "}Uploading....
      </Backdrop>

      <div className="regpage">
        <div className="reg-title">Update Template</div>
        <hr />
        <br />
        <form>
        <div class="inputs">
          <input type="text" required
            className="reg-input"
             value={topic}
             onChange={(e) => setTopic(e.target.value)}
             placeholder="New Topic"
          />
          </div>
          <br />

          <textarea type="text" required 
              className="reg-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="New Description"
          />
          <br />
          <input type="file" className="uploadButton"
            onChange={onFileSelect} 
            />
          <button onClick={uploadfile} className="upload-button">upload Template</button>
          <br /><br />

          <button onClick={updateTemplate} className="reg-button">Update Template</button>
        </form>
      </div>
      </center>
        </div>
    )
}

export default edittemplate
