import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../RegisterForm/register.css";
import { useHistory } from 'react-router-dom';

function admineditdata() {

  const history = useHistory();

  const params = useParams();
    console.log(params.id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');

  const getData = async () => {
    const data = await axios.get(
      `/role_manage/finduser/${params.id}`
    );
    //console.log(data.data.data);
    setName(data.data.data.name);
    setEmail(data.data.data.email);
    setuserName(data.data.data.username);
  };

  //get consoles data
  useEffect(() => {
      getData();
  }, [])

  //update Data
  const UpdateDetails = async (e) =>  {
    e.preventDefault();

    let updateUserDetails = {
        name: name,
        email: email,
        username: userName
    }
    const updateData = await axios.put(`/role_manage/update/${params.id}`, updateUserDetails)
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
      <div className="reg-title">Update User Details</div>
        <hr />
        <br />
        <form>
        <div class="inputs">
          <input
            type="text"
            required
            className="reg-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New Name"
          />
      </div>
      <br />
  
          <input
            type="email"
            required
            className="reg-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="New Email"
          />

<br />

          <input
            type="text"
            required
            className="reg-input"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="New Username"
          />

<br />
          <button onClick={UpdateDetails} className="reg-button">update Details</button>
        </form>
      </div>
      </center>
    </div>
  );
}

export default admineditdata;
