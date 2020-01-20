import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FriendCard = ({info, setFriends}) =>{

    const FriendBox = styled.div`
        max-width: 400px;
        width: 100%;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
        margin: 10px auto;
        padding: 20px;
        text-align: left;

    `

    const DeleteButton = styled.button`
        background: red;
        padding: 5px 10px;
        border: none;
        color: white;
        font-weight: 500;
        cursor: pointer;

    `

    const deleteFriend = (id) =>{
        axios.delete(`http://localhost:5000/api/friends/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            setFriends(res.data)
        })

    }
    return (
        <div className="friend-card">
            <FriendBox>
                <b>Name:</b> {info.name}<br/>
                <b>Age:</b> {info.age}<br/>
                <b>Email:</b> {info.email}<br/>
                <DeleteButton onClick={()=>{deleteFriend(info.id)}}>Delete</DeleteButton>

            </FriendBox>
        </div>
    )
}

export default FriendCard;