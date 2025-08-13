package com.ChatAppilcation.ChatApplication.Controller;

import com.ChatAppilcation.ChatApplication.Config.AppConstraints;
import com.ChatAppilcation.ChatApplication.Service.RoomService;
import com.ChatAppilcation.ChatApplication.dto.Message;
import com.ChatAppilcation.ChatApplication.dto.MessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(AppConstraints.FRONTEND_BASE_URL)
public class ChatController
{
    @Autowired
    RoomService roomService;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message doChats(@DestinationVariable String roomId,
                           @RequestParam MessageRequest req)
    {
        System.out.println("Received message: " + req.getContent() + " from " + req.getSender());
        return roomService.doChats(roomId,req);
    }


}
