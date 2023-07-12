package com.example.EventPlace.repository;


import com.example.EventPlace.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.senderName = :user1 AND m.receiverName = :user2) OR (m.senderName = :user2 AND m.receiverName = :user1)")
    List<Message> findMessagesBetweenUsers(@Param("user1") String user1, @Param("user2") String user2);

    @Query("SELECT m FROM Message m WHERE m.senderName = :username OR m.receiverName = :username")
    List<Message> findMessagesByUser(@Param("username") String username);


}

