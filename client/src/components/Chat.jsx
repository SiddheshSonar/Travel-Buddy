"use client"
import React, { useState, useEffect } from 'react';

const Chat = ({ socket, receiver, sender, room }) => {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    // console.log(receiver)
    // console.log(sender)
    // console.log(room)
    // console.log(socket)

    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: sender.name,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
            }

            setMessageList((list) => [...list, messageData])
            await socket.emit('send_message', messageData)
        }
        setCurrentMessage('')
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
            console.log(data)
        })
    }, [socket])

    useEffect(() => {
        console.log(messageList)
    }, [messageList])

    // sending msg on pressing enter
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className='w-full h-full'>
            <div className='w-full text-center text-xl text-white font-bold'>
                Your Chats
            </div>
            <div className='flex flex-col gap-2 h-3/4 rounded-t-xl bg-white border overflow-y-scroll p-2.5'>
                {messageList.map((val, key) => {
                    return (
                        <div key={key} className={`${val.author === sender.name ? "self-end" : "self-start"} w-1/2`}>
                            <div className='w-full text center border rounded-xl flex flex-col items-start justify-center p-2.5'>
                                <div className={`${val.author === sender.name ? "text-send" : "text-rec"} font-bold text-xs`}>
                                    {val.author === sender.name ? "You" : val.author}
                                </div>
                                <div>
                                    {val.message}
                                </div>
                                <div className='text-xs self-end'>
                                    {val.time}
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <div className='w-full flex items-center'>
                <input type="text"
                    placeholder='Your Message....'
                    className='w-11/12 h-12 rounded-b-xl border p-2.5 rounded-br-none'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value)
                    }}
                    value={currentMessage}
                    onKeyDown={handleKeyDown}
                />
                <button className='btn btn-primary h-12 w-auto !rounded-tl-none !rounded-tr-none !rounded-bl-none' onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;