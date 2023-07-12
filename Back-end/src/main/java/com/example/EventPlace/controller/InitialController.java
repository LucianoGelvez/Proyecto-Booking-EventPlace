package com.example.EventPlace.controller;


import com.example.EventPlace.domain.Message;
import com.example.EventPlace.service.implement.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/initial")
public class InitialController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{user1}/{user2}")
    public List<Message> handleInitialRequest(@PathVariable("user1") String user1, @PathVariable("user2") String user2) {
        List<Message> messages = messageService.chatMessages(user1, user2);
        return messages;
    }

    @GetMapping("/findByUser/{user}")
    public List<Message> findByUser(@PathVariable String user)
    {
        return messageService.findByUser(user);
    }

}

