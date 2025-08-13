package com.ChatAppilcation.ChatApplication.Repo;

import com.ChatAppilcation.ChatApplication.Entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepo extends MongoRepository<Room,String>
{
    Room findByRoomId(String roomId);
}
