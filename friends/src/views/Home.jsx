import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import FriendCard from '../components/FriendCard';
import AddModal from '../components/AddModal';

const Home = ()=> {

    const [friends, setFriends] = useState([])
    const [AddModalOpen, setModalOpen] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:5000/api/friends', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            setFriends(res.data)
        })
    }, [])


    const AddButton = styled.button`
        position: absolute;
        bottom: 100px;
        right: 100px;
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background: #3CAEA3;
        border: none;
        box-shadow: 10px 10px 10px rgba(0,0,0,0.2);
        font-size: 40px;
        color: white;
        cursor: pointer;

    `
    return (
        <div className="home">
          {AddModalOpen ?  <AddModal setFriends={setFriends} setModalOpen={setModalOpen}/> : ''}
            <h1>Welcome to your friend list</h1>
            {friends.length ? friends.map(friend=>{
                return <FriendCard info={friend} setFriends={setFriends} key={friend.id} />
            }): 'You got not friends'}
<AddButton onClick={()=>{setModalOpen(!AddModalOpen)}}>{AddModalOpen ? 'x' : '+'}</AddButton>
        </div>
    );

};

export default Home