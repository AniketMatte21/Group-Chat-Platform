export default async function getLoadMessages(roomId,size=50,page=0)
{
    try{

       let res=await fetch(`http://localhost:8080/api/getMessages/${roomId}?size=${size}&page=${page}`)
       res=await res.json();
       return res;
       

        
    }catch(error)
    {
        throw error
    }
}