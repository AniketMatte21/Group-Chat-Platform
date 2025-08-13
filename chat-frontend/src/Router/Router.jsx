import React from "react";
import { Routes,Route } from "react-router"
import App from "../App";
import ChatPage from "../component/ChatPage";
function AppRouter()
{
    return(
        <>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
        </>
    )
}

export default AppRouter;