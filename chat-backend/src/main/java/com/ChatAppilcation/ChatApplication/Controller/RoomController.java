package com.ChatAppilcation.ChatApplication.Controller;

import com.ChatAppilcation.ChatApplication.Config.AppConstraints;
import com.ChatAppilcation.ChatApplication.Service.RoomService;
import com.ChatAppilcation.ChatApplication.dto.Message;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(AppConstraints.FRONTEND_BASE_URL)
public class RoomController
{
    @Autowired
    RoomService roomService;

    //create room by roomId
    @PostMapping("/createRoom")
    public ResponseEntity<?> createRoom(@RequestBody String roomId)
    {
        return roomService.createRoom(roomId);
    }

    //get room by roomId
    @GetMapping("/getRoom/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable String roomId)
    {
        return roomService.getRoom(roomId);
    }

    //get messages by roomId
    @GetMapping("/getMessages/{roomId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomId,
                                                     @RequestParam(value="page",defaultValue = "8",required = false) int page,
                                                     @RequestParam(value="size",defaultValue = "20",required = false) int size)
    {
        return roomService.getMessages(roomId,page,size);
    }
}
