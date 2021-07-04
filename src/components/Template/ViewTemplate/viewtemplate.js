import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from 'react-router-dom';

function viewtemplate() {

    const history = useHistory();

    const [state, setState] = useState([]);

    //get all templates
    const getAllTemplates = async () => {
        try{
          const data = await axios.get('/template/templateAllBack')
         // console.log(data);
          setState(data.data.data);
        }
        catch(error) {
          //console.log(error);
          alert(error.message);
        }
    };

useEffect(() => {
     getAllTemplates();
  }, []);

  //render to update page
const UpdateTemplate = (id) => {
    // console.log(id);
    let path = `/update-template/${id}`
    history.push(path);
}

  //delete data
  const deleteTemplate = (id) => {
    //console.log(id);
    axios.delete(`/template/delete/${id}`)
     .then((response) => {
       //console.log(response.data);
       alert('Template Deleted');
       window.location.reload();
     })
     .catch((error) => {
       //console.log(error.message);
       alert(error.message);
     })
  };


    return (
        <div>
            <br /><br />
    <center>
      <table className="styled-table table-bordered">
    <thead>
        <tr>
            <th>Topic</th>
            <th>Description</th>
            <th>Template</th>
            <th>Edit Template</th>
        </tr>
    </thead>

    {state.map((template) => (
    <tbody>
        <tr key={template.topic}>
            <td>{template.topic}</td>
            <td>{template.description}</td>
            <td>
            <button className="btn btn-dark btn-md px-4 gap-3"><a href={template.url} 
              style={{ color: "#fff", textDecoration: "none" }}>Download</a></button>
            </td>

            <td>
               <IconButton onClick={() => {deleteTemplate(template._id)}}> <DeleteIcon color="secondary"/> </IconButton> 
               <IconButton onClick={() => {UpdateTemplate(template._id)}}> <EditIcon color="primary" /> </IconButton> 
            </td>
        </tr>
    </tbody>
    ))}
</table>
{/* </div> */}
  </center>
        </div>
    )
}

export default viewtemplate
