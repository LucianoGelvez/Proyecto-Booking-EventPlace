package com.example.EventPlace.controller;

import com.example.EventPlace.dto.ChangePasswordBody;
import com.example.EventPlace.repository.UserRepository;
import com.example.EventPlace.service.implement.UserImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/confirmToken")
public class ConfirmTokenController {

    private UserImplement userImplement;
    private UserRepository userRepository;

    @Autowired
    public ConfirmTokenController(UserImplement userImplement, UserRepository userRepository) {
        this.userImplement = userImplement;
        this.userRepository = userRepository;
    }

    @GetMapping("{token}")
    public String confirmToken(@PathVariable String token)
    {
        return userImplement.confirmToken(token);
    }

    @PostMapping("/sendEmailChangePassword/{username}")
    public ResponseEntity<String> sendEmailChangePassword(@PathVariable String username)
    {

        System.out.println(username);
        if(userRepository.findByUsername(username).isEmpty())
        {
            return ResponseEntity.notFound().build();
        }
        userImplement.sendResetPasswordEmail(username);
        return ResponseEntity.ok("An email to change password was sent to: " + username);
    }

    @PostMapping("/sendConfirmationAgain/{username}")
    public ResponseEntity<String> sendConfirmationEmailAgain(@PathVariable String username)
    {
        if(userRepository.findByUsername(username).isEmpty())
        {
            return ResponseEntity.notFound().build();
        }
        if(userRepository.findByUsername(username).get().getEnabled() == true)
        {
            return ResponseEntity.badRequest().body("That user is already enabled");
        }
        userImplement.sendConfirmationMailAgain(username);
        return ResponseEntity.ok("An email to change password was sent to: " + username);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String>changePassword(@RequestBody ChangePasswordBody changePasswordBody)
    {
        System.out.println(changePasswordBody);
        userImplement.changePassword(changePasswordBody);
       return ResponseEntity.ok("Password changed");
    }


}
