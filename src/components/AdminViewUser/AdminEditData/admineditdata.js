import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../RegisterForm/register.css";

function admineditdata() {
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
     })
     .catch((error) => {
         console.log(error.message);
     })
    //console.log(updateUser);
  }

  return (
    <div>
      <div className="create">
        <h1>Update User Details</h1>
        <form>
          <label>Enter New Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />

          <label>Enter New Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <label>Enter New Username</label>
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <br />

          <button onClick={UpdateDetails}>update Details</button>
        </form>
      </div>
    </div>
  );
}

export default admineditdata;
