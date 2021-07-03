import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { storage } from '../../../firebase';

function edittemplate() {

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
            history.go(-1);
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

          <button onClick={updateTemplate}>Update Template</button>
        </form>
      </div>
        </div>
    )
}

export default edittemplate
