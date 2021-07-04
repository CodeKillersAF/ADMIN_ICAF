import React, { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function viewtemplate() {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState([]);

  const [reload, setReload] = useState(false);

  const [templateid, setTemplateid] = useState('');

  //delete handle functions
  const handleClickOpen = (e,templateId) => {
    setTemplateid(templateId);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  //get all templates
  const getAllTemplates = async () => {
    try {
      const data = await axios.get("/template/templateAllBack");
      // console.log(data);
      setState(data.data.data);
    } catch (error) {
      //console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getAllTemplates();
  }, [reload]);

  //render to update page
  const UpdateTemplate = (id) => {
    // console.log(id);
    let path = `/update-template/${id}`;
    history.push(path);
  };

  //delete data
  const deleteTemplate = () => {
    //console.log(id);
    setOpen(false);
    axios
      .delete(`/template/delete/${templateid}`)
      .then((response) => {
        //console.log(response.data);
        alert("Template Deleted");
        setReload(!reload);
      })
      .catch((error) => {
        //console.log(error.message);
        alert(error.message);
      });
  };

  //download url button set
  const downloadUrl = (url) => {
    console.log(url);
    const link = document.createElement("a");
    link.href = url;
    link.click();
  };

  return (
    <div>
      {/* delete box */}
      {/* dialog box */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete template permanent
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteTemplate} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <br />
      <br />
      <center>
        <table className="styled-table table-bordered">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Template</th>
              <th>Edit Template</th>
            </tr>
          </thead>

          {state.map((template) => (
            <tbody>
              <tr key={template.topic}>
                <td>{template.topic}</td>
                <td>
                  {/* <button className="btn btn-dark btn-md px-4 gap-3"><a href={template.url} 
              style={{ color: "#fff", textDecoration: "none" }}>Download</a></button> */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      downloadUrl(template.url);
                    }}
                    endIcon={<GetAppIcon />}
                  >
                    Download
                  </Button>
                </td>
                <td>
                  <IconButton
                    onClick={
                      (e) => handleClickOpen(e, template._id)
                      }
                  >
                    {" "}
                    <DeleteIcon color="secondary" />{" "}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      UpdateTemplate(template._id);
                    }}
                  >
                    {" "}
                    <EditIcon color="primary" />{" "}
                  </IconButton>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {/* </div> */}
      </center>
    </div>
  );
}

export default viewtemplate;
