"use client"
import React, { useState, useEffect } from 'react';

const Chat = ({ socket, receiver, sender, room }) => {
    const [currentMessage, setCurrentMessage] = useState('')
    console.log(receiver)
    console.log(sender)
    console.log(room)
    console.log(socket)

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: sender.name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            }
        
        await socket.emit('send_message', messageData)
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
        })
    }, [socket])

    return (
        <div className='w-full'>
            <div>
                Your Chats
            </div>
            <div>
                body
            </div>
            <div>
                <input type="text" 
                placeholder='Your Message....' 
                onChange={(event) => {
                    setCurrentMessage(event.target.value)
                }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;