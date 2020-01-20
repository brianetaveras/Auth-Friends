import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalBox = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  z-indez: 999999;
  background: white;
  transition: 5s;
`;

const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
`;

const AddInput = styled.input`
  width: 80%;
  margin: 10px auto;
  height: 50px;
  padding: 5px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
`;

const AddButton = styled.button`
  display: block;
  width: 80%;
  margin: 10px auto;
  height: 50px;
  padding: 5px;
`;
const AddModal = ({setFriends, setModalOpen}) => {

  const [newFriend, setNewFriend] = useState({});
  
  
  const handleChange = e => {
    setNewFriend({
        ...newFriend,
        [e.target.name]: e.target.value
    })

  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
    .post("http://localhost:5000/api/friends",{...newFriend} ,{
      headers: {
        Authorization: localStorage.getItem('token')
      },
    }, ).then(res=>{
        setFriends(res.data)
        setNewFriend({})
        setModalOpen(false)

    })
  };

  return (
    <div className="add-modal">
      <Overlay>
        <ModalBox>
          <h1>Add a Friend</h1>
          <form onSubmit={handleSubmit}>
            <AddInput
              type="text"
              onChange={handleChange}
              placeholder="Name"
              name="name"
            />
            <AddInput
              type="text"
              onChange={handleChange}
              placeholder="Age"
              name="age"
            />
            <AddInput
              type="text"
              onChange={handleChange}
              placeholder="Email"
              name="email"
            />
            <AddButton>Add Friend</AddButton>
          </form>
        </ModalBox>
      </Overlay>
    </div>
  );
};

export default AddModal;
