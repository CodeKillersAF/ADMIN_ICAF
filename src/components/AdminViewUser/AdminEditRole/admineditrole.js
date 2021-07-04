import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../RegisterForm/register.css";
import { useHistory } from 'react-router-dom';

function adminedituser() {

  const history = useHistory();

  const params = useParams();
  //console.log(params.id);
  const [userName, setUserName] = useState('');
  const [roleCheck, setRolecheck] = useState('');

  const getRole = async () => {
    const data = await axios.get(
      `/role_manage/finduser/${params.id}`
    );
    //console.log(data.data.data);
    setUserName(data.data.data.username);
    setRolecheck(data.data.data.role);
  };

  useEffect(() => {
    getRole();
  }, []);

  const UpdateRole = async (e) =>  {
    e.preventDefault();

    let updateUser = {
        username: userName,
        role: roleCheck
    }
    const updateData = await axios.put(`/role_manage/update/role/${params.id}`, updateUser)
     .then((response) => {
         console.log(response.data);
        let path = '/view-user';
        history.push(path);
     })
     .catch((error) => {
         console.log(error.message);
     })
    //console.log(updateUser);
  }

  return (
    <div>
      <center>
      <div className="regpage">
      <div className="reg-title">Update User Role</div>
      <hr />
      <br />
        <form>
          <div class="inputs">
          <input className="reg-input" type="text" required 
           value={userName}
            disabled
          />
          </div>
<br />
          <select 
            className="reg-input"
            required
            value={roleCheck}
            onChange={(e) => setRolecheck(e.target.value)}
          >
           {/* <option value={user.role}>{user.role}</option> */}
            <option value="editor">Editor</option>
            <option value="reviewer">Reviewer</option>
          </select> <br /><br />
          <button onClick={UpdateRole} className="reg-button">update Role</button>
        </form>
      </div>
      </center>
    </div>
  );
}

export default adminedituser;
