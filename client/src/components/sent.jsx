import React, { useState } from 'react';
import "./friends.css"

const Sent = () => {
    const [sentFollowRequests, setSentFollowRequests] = useState([
        { id: 3, name: 'Eva Martinez', status: 'pending' },
        { id: 4, name: 'David Wilson', status: 'accepted' },
        // Add more sent follow requests here
      ]);

    return (
        <div>
            <ul className="sent-follow-requests-list">
                {sentFollowRequests.map((request) => (
                    <li key={request.id} className="sent-follow-request">
                        <div className="request-info">
                            <span className="request-name">{request.name}</span>
                            <span className={`request-status ${request.status}`}>{request.status === 'pending' ? 'Pending' : 'Accepted'}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sent;