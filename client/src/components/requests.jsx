import React, { useState } from 'react';
import "./friends.css"

const Requests = () => {
    const [friendRequests, setFriendRequests] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
    ]);

    const acceptRequest = (id) => {
        const acceptedRequest = friendRequests.find((request) => request.id === id);
    
        if (acceptedRequest) {
          // Remove the request from the friendRequests list
          setFriendRequests(friendRequests.filter((request) => request.id !== id));
        }
      };
    
      const rejectRequest = (id) => {
        setFriendRequests(friendRequests.filter((request) => request.id !== id));
      };

    return (
        <div>
            <ul className="friend-requests-list">
                {friendRequests.map((request) => (
                    <li key={request.id} className="friend-request">
                        <div className="request-info">
                            <span className="request-name">{request.name}</span>
                            <span className="request-status pending">Pending</span>
                        </div>
                        <div className="request-actions">
                            <button className="accept-button" onClick={() => acceptRequest(request.id)}>Accept</button>
                            <button className="reject-button" onClick={() => rejectRequest(request.id)}>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Requests;