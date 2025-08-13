import React, { use, useState } from "react";
import ChatContext from "./ChatContext";


function ChatProvider({children})
{
    let [roomId,setRoomId]=useState('');
    let [currentUser,setCurrentUser]=useState('');
    let [connected,setConnected]=useState(false);

    return(
        <ChatContext.Provider value={{roomId,setRoomId,currentUser,setCurrentUser,connected,setConnected}}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;