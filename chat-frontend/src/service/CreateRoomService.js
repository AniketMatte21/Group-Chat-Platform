import React from "react";

async function useCreateRoom(roomId)
{
    try{
        let response=await fetch("http://localhost:8080/api/createRoom",{
            method:"post",
            headers:{
                "Content-Type":"text/plain"
            },
            body:roomId
        })

        if(response.ok)
        {
            response=await response.json();
            
        }
        return response;

        

    }catch(error)
    {

        throw error
    }

    

}

export default useCreateRoom;