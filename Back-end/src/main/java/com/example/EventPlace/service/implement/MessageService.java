package com.example.EventPlace.service.implement;


import com.example.EventPlace.domain.Message;
import com.example.EventPlace.repository.MessageRepository;
import com.example.EventPlace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public Message saveMessage(Message message)
    {
        return messageRepository.save(message);
    }

    public List<Message> findAllMessages()
    {
        return messageRepository.findAll();
    }

    public List<Message> chatMessages(String user1, String user2) {
        List<Message> mensajes = messageRepository.findMessagesBetweenUsers(user1, user2);
        return mensajes;
    }

    public List<Message> findByUser(String user) {
        List<Message> messages = messageRepository.findMessagesByUser(user);
        List<String> otherUsers = new ArrayList<>();
        List<Message> lastMessagesList = new ArrayList<>();
        for (Message message : messages) {
            if (!message.getReceiverName().equals(user)) {
                if (otherUsers.isEmpty() || otherUsers == null) {
                    otherUsers.add(message.getReceiverName());
                } else {
                    Iterator<String> iterator = otherUsers.iterator();
                    boolean userExists = false;
                    while (iterator.hasNext()) {
                        String otherUserName = iterator.next();
                        if (message.getReceiverName().equals(otherUserName)) {
                            userExists = true;
                            break;
                        }
                    }
                    if (!userExists) {
                        otherUsers.add(message.getReceiverName());
                    }
                }
            }
            if (!message.getSenderName().equals(user)) {
                if (otherUsers.isEmpty() || otherUsers == null) {
                    otherUsers.add(message.getSenderName());
                } else {
                    Iterator<String> iterator = otherUsers.iterator();
                    boolean userExists = false;
                    while (iterator.hasNext()) {
                        String otherUserName = iterator.next();
                        if (message.getSenderName().equals(otherUserName)) {
                            userExists = true;
                            break;
                        }
                    }
                    if (!userExists) {
                        otherUsers.add(message.getSenderName());
                    }
                }
            }
        }

        for (String otherUserName : otherUsers) {
            List<Message> messageList = messageRepository.findMessagesBetweenUsers(otherUserName, user);
            if (!messageList.isEmpty()) {
                Message message = messageList.get(messageList.size() - 1);
                String firstCharacter = otherUserName.substring(0, 1);
                long userId = Long.parseLong(firstCharacter);
                message.setOtherUserUrlImage(userRepository.findById(userId).get().getProfileImage());
                lastMessagesList.add(message);
            }
        }


        return lastMessagesList;
    }




}
