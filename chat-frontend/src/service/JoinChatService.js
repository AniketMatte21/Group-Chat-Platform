import React from "react";

export default async function JoinChat(roomId)
{
    try{

        let response=await fetch(`http://localhost:8080/api/getRoom/${roomId}`,
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )
        
        console.log(response.status);
        return response.status;

    }catch(error)
    {
        throw error;
    }
}
