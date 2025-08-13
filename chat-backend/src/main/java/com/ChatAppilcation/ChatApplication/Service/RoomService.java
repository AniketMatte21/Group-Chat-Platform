package com.ChatAppilcation.ChatApplication.Service;

import com.ChatAppilcation.ChatApplication.Entity.Room;
import com.ChatAppilcation.ChatApplication.Repo.RoomRepo;
import com.ChatAppilcation.ChatApplication.dto.Message;
import com.ChatAppilcation.ChatApplication.dto.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RoomService
{
    @Autowired
    RoomRepo roomRepo;

    public ResponseEntity<?> createRoom(String roomId)
    {
        Room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId==null)
        {
            Room room=new Room();
            room.setRoomId(roomId);
            roomRepo.save(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(room);

        }

        return ResponseEntity.badRequest().body("Room already exist");
    }


    public ResponseEntity<?> getRoom(String roomId)
    {
        Room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId==null)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(byRoomId);
    }

    public ResponseEntity<List<Message>> getMessages(String roomId,int page,int size)
    {
        Room byRoomId = roomRepo.findByRoomId(roomId);
        if(byRoomId==null)
        {
            return ResponseEntity.badRequest().build();
        }

        List<Message> messages=byRoomId.getMessage();

        int start=Math.max(0,messages.size()-(page+1)*size);
        int end=Math.min(messages.size(),start+size);
        List<Message> paginatedMasseges=messages.subList(start,end);

        return ResponseEntity.ok(paginatedMasseges);
    }

    public Message doChats(String roomId, MessageRequest req)
    {

        Room byRoomId = roomRepo.findByRoomId(roomId);

        Message message=new Message();
        message.setContent(req.getContent());
        message.setSender(req.getSender());
        message.setTimestamp(LocalDateTime.now());

        if(byRoomId!=null)
        {
           byRoomId.getMessage().add(message);
           roomRepo.save(byRoomId);
        }

        return message;
    }
}
