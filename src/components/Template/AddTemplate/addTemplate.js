import axios from 'axios';
import React, { useState} from 'react';
import { storage } from '../../../firebase';

function addTemplate() {

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
        )
    };

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

          <button onClick={addTemplate}>Add Template</button>
        </form>
      </div>
        </div>
    )
}

export default addTemplate
