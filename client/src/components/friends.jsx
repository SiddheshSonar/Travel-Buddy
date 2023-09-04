import React, { useState } from 'react';
import "./friends.css"

const Friends = () => {
    const [friends, setFriends] = useState([
        { id: 101, name: 'Alice Johnson' },
        { id: 102, name: 'Bob Brown' },
      ]);
    return (
        <div>
            <ul className="friends-list">
                {friends.map((friend) => (
                    <li key={friend.id} className="friend-item">
                        <span className="friend-name">{friend.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Friends;