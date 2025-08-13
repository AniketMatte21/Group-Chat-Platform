import React, { use, useContext, useEffect } from "react"
import chat from '../assets/chat.png'
import { useState } from "react"
import toast from "react-hot-toast"
import useCreateRoom from "../service/CreateRoomService"
import ChatContext from "../Context/ChatContext/ChatContext.js"
import { useNavigate } from "react-router"
import JoinChat from "../service/JoinChatService.js"



function JoinCreatechat()
{
    const {roomId,setRoomId,currentUser,setCurrentUser,connected,setConnected}=useContext(ChatContext);
    const navigate=useNavigate();

    
    const[details,setDetails]=useState({
        roomId:"",
        username:""
    })


    async function joinChat()
    {
        if(validateForm())
        {
            let res=await JoinChat(details.roomId);
            console.log(res);
            if(res===400)
            {
                toast.error("cannot join room , room doesn't exists..");
            }
            else if(res===200)
            {
                toast.success("successfully joined the room..");
                setCurrentUser(details.username);
                setRoomId(details.roomId);
                setConnected(true);
                navigate("/chat");
            }

        }
        
    }

    async function createRoom()
    {
        console.log(details.roomId)
        if(validateForm())
        {

            try{

                const res=await useCreateRoom(details.roomId)
                if(res.status===400)
                {
                    toast.error("room already exist");
                }
                else
                {
                    toast.success(
                        "room created successfully"
                    )

                    setCurrentUser(details.username);
                    setRoomId(details.roomId);
                    setConnected(true);
                    navigate("/chat");
                }
               
              
            }catch(error)
            {
                toast.error(error)
            }


        }
    }

    function validateForm()
    {
        if(details.username==="" || details.roomId==="")
        {
            toast.error("cannot expect empty fields..")
            return false;
        }
        return true;


    }


 


    return(
        <>
            <div className="h-screen flex items-center justify-center" >
                <div className="flex flex-col justify-items-start gap-9 max-w-xl border-black p-9 bg-gray-800 rounded-2xl">

                    <div>
                        <img src={chat} alt="chat-icon" className="w-14 mx-auto" />
                    </div>


                    <h1 className="text-2xl font-bold text-center">Join Room / Create Room</h1>

                        
                        <div className="flex flex-col max-w-150 gap-2">

                             <label htmlFor="name" className="font-bold"> Your Name
                                    </label>
                             <input type="text" placeholder="Enter your name" id="name" className="w-full rounded bg-gray-700 p-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                             value={details.username}
                             name="username"
                             onChange={(e)=>{
                                setDetails({...details,username:e.target.value})
                                console.log(details)
                                }}
                             />

                                <label htmlFor="roomId" className="font-bold">
                                    Room ID 
                                </label>
                                <input type="text" placeholder="Enter room ID" className="w-full rounded bg-gray-700 p-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={details.roomId}
                                name="roomId"
                                onChange={(e)=>{setDetails(
                                    {
                                        ...details,roomId:e.target.value
                                    }
                                    
                                )
                               
                                }}/>

                        </div>

                        <div className="flex justify-around">
                            <button className="bg-green-500 p-3 rounded-full hover:bg-green-700" onClick={()=>{
                                    joinChat();


                            }}>Join Room</button>
                            <button className="bg-blue-500 p-3 rounded-full hover:bg-blue-700" onClick={()=>{
                                createRoom();
                                
                            }}>Create Room</button>
                        </div>
                   
                    
                </div>
            </div>
        </>
    )
}

export default JoinCreatechat;