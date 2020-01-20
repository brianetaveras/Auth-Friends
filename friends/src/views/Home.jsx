import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import FriendCard from '../components/FriendCard';

const Home = ()=> {

    const [friends, setFriends] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/api/friends', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            console.log(res)
            setFriends(res.data)
        })
    }, [])



    return (
        <div className="home">
            <h1>Welcome to your friend list</h1>
            {friends.length ? friends.map(friend=>{
                return <FriendCard info={friend} setFriends={setFriends} key={friend.id} />
            }): 'You got not friends'}

        </div>
    );

};

export default Home