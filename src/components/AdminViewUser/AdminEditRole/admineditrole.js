import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../RegisterForm/register.css";

function adminedituser() {
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
     })
     .catch((error) => {
         console.log(error.message);
     })
    //console.log(updateUser);
  }

  return (
    <div>
      <div className="create">
        <h1>Update User Role</h1>
        <form>
          <label>Username</label>
          <input type="text" required 
           value={userName}
            disabled
          />
          <br />

          <label>Select New Role</label>
          <select 
            required
            value={roleCheck}
            onChange={(e) => setRolecheck(e.target.value)}
          >
           {/* <option value={user.role}>{user.role}</option> */}
            <option value="editor">Editor</option>
            <option value="reviewer">Reviewer</option>
          </select> <br /><br />
          <button onClick={UpdateRole}>update Role</button>
        </form>
      </div>
    </div>
  );
}

export default adminedituser;
