import React, { useContext, useEffect } from "react"
import attachment from '../assets/attachment.png'
import { IoMdSend } from "react-icons/io";
import { MdAttachment } from "react-icons/md";
import { useRef ,useState} from "react";
import ChatContext from "../Context/ChatContext/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Client,Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import getLoadMessages from "../service/loadMessages";



export default function ChatPage()
{
    const {roomId,setRoomId,connected,setConnected,currentUser,setCurrentUser}=useContext(ChatContext);

    const navigate=useNavigate();

    useEffect(()=>{
        if(!connected)
        {
            navigate("/")
        }
    },[connected,roomId,currentUser])


    const [messages,setMessage]=useState([]);


    const [input,setInput]=useState("");
    const inputRef=useRef(null);
    const chatBoxRef=useRef(null);

    useEffect(()=>{
        async function loadMessages()
        {
        try{
        let message=await getLoadMessages(roomId)
        setMessage(message);
        }catch(error)
        {
            console.log("failed to fetch messages")
        }

        }

        loadMessages();
       
       
    },[roomId])


    useEffect(()=>{
        if(chatBoxRef.current)
        {
            chatBoxRef.current.scroll({
                top:chatBoxRef.current.scrollHeight,
                behavior:'smooth'
            })
        }
    },[messages])


//Time in Ago
function timeAgo(dateInput) {
    const date = new Date(dateInput);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) {
        return secondsAgo + ' second' + (secondsAgo !== 1 ? 's' : '') + ' ago';
    } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    } else if (secondsAgo < 604800) {
        const days = Math.floor(secondsAgo / 86400);
        return days + ' day' + (days !== 1 ? 's' : '') + ' ago';
    } else if (secondsAgo < 2592000) {
        const weeks = Math.floor(secondsAgo / 604800);
        return weeks + ' week' + (weeks !== 1 ? 's' : '') + ' ago';
    } else if (secondsAgo < 31536000) {
        const months = Math.floor(secondsAgo / 2592000);
        return months + ' month' + (months !== 1 ? 's' : '') + ' ago';
    } else {
        const years = Math.floor(secondsAgo / 31536000);
        return years + ' year' + (years !== 1 ? 's' : '') + ' ago';
    }
}


const [stompClient, setStompClient] = useState(null);

useEffect(() => {
    const client=new Client(
        {
            webSocketFactory:()=>new SockJS("http://localhost:8080/chat"),
            reconnectDelay:5000,
            debug:(str)=>console.log(str)
        }

       
    )

     client.onConnect=(frame)=>{

            setStompClient(client);

            client.subscribe(
                `/topic/room/${roomId}`,
                (message)=>{
                    const Messages=JSON.parse(message.body);
                    setMessage((prev)=>[...prev,Messages])
                }
            )
        }

        client.activate();
       return ()=>{
        client.deactivate();
       }
}, [roomId]);


const sendMessage = () => {
  if (stompClient && stompClient.connected && input!=="") {
    stompClient.publish({
      destination: `/app/sendMessage/${roomId}`,
      body: JSON.stringify({
        sender: currentUser,
        content: input,
      }),
    });
    setInput("");

  } 
};


//handle logout
function handleLogout()
{
    stompClient.deactivate();
    setConnected(false);
    setCurrentUser("");
    setRoomId("");
    navigate("/");
}

// function enterKeySend(event)
// {
//     if(event.key==='Enter' && !key.shifKey)
//     {
//         console.log("enter key presses")
//         sendMessage();
//     }
// }





    return(
        <>
        <div className="max-h-screen">
            <header className="h-15 w-full fixed bg-gray-700 flex justify-around items-center">

                <div className="font-bold">
                    Room: <span className="font-bold">{roomId}</span>
                </div>
                    
                <div className="font-bold">
                    User: <span className="font-bold">{currentUser}</span>
                </div>
                    
                <div>
                    <button onClick={handleLogout} className="p-2 bg-orange-700 hover:bg-orange-500 rounded">Leave Room</button>
                </div>

            </header>

            
                <main 
                ref={chatBoxRef}
                className="h-screen py-15 overflow-auto mx-auto w-2/3 bg-gray-400">

                    {
                        messages.map((message,index)=>(
                            <div key={index} className={`flex px-5
                                ${message.sender===currentUser?"justify-end":"justify-start"}  `}>
                            
                            <div className={` my-2 p-4 rounded-xl max-w-xs ${
                                message.sender===currentUser?"bg-green-950 text-white":"bg-gray-900"
                            }`}>

                                <div className="flex flex-row gap-2">
                                <img className="h-6 w-6" src={message.sender===currentUser?"https://avatar.iran.liara.run/public/46":"https://avatar.iran.liara.run/public/12"} alt="" />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm font-bold text-gray-300">{message.sender}</p>
                                    <p className="text-sm">{message.content}</p>
                                    <p className="text-xs text-gray-500">{timeAgo(message.timestamp)}</p>
                                    
                                    
                                </div>

                               </div>

                                </div>
                              
                            </div>
                        ))
                    }

                </main>
        


            {/* {input message container} */} 
            <footer className=" fixed bottom-0 w-full h-12">

               <div className="h-full w-2/3  mx-auto bg-gray-700 flex justify-around items-center ">

               <div className="w-full">
                    <input value={input}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter")
                        {
                            sendMessage();
                        }
                    }}
                    onChange={
                        (e)=>{setInput(e.target.value)}
                    } type="text" placeholder="Type a message..." className="bg-gray-700 h-12 w-full p-2 focus:outline-none rounded-4xl" />
               </div>

               <div className="flex justify-center items-center p-5 gap-3">
                     {/* <div className="">
                        <button className="p-3 rounded-4xl bg-blue-400  hover:bg-blue-800">
                            <MdAttachment/>
                        </button>
                     </div> */}

                    <div>
                         <button 
                         onClick={sendMessage}
                        //  onKeyDown={enterKeySend}
                         className="p-3 rounded-4xl bg-green-600  hover:bg-green-800">
                            <IoMdSend/>
                         </button>
                    </div>
               </div>

              
              

               </div>
            </footer>
        </div>
        </>
    )
}