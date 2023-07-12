package com.example.EventPlace.controller;

import com.example.EventPlace.domain.User;
import com.example.EventPlace.dto.EventPlaceDTO;
import com.example.EventPlace.dto.UserDTO;
import com.example.EventPlace.jwt.JwtUtil;
import com.example.EventPlace.repository.UserRepository;
import com.example.EventPlace.service.implement.UserImplement;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Set;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private UserImplement userImplement;

    private DaoAuthenticationProvider daoAuthenticationProvider;
    private JwtUtil jwtUtil;

    private UserRepository userRepository;

    private static final Logger logger = LogManager.getLogger(UserController.class);


    @Autowired
    public UserController(UserImplement userImplement, DaoAuthenticationProvider daoAuthenticationProvider, JwtUtil jwtUtil, UserRepository userRepository) {
        this.userImplement = userImplement;
        this.daoAuthenticationProvider = daoAuthenticationProvider;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @PostMapping("/create-user")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userImplement.createUser(user));
    }

    @PutMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@ModelAttribute("file") MultipartFile file, @RequestParam("id") Long id)
    {
        userImplement.uploadImageProfile(file, id);
        return ResponseEntity.ok("Image uploaded");
    }

    @DeleteMapping("/deleteImage/{id}")
    public ResponseEntity<UserDTO> deleteImage(@PathVariable Long id)
    {
        return ResponseEntity.ok(userImplement.deleteImage(id));
    }

    @GetMapping
    public List<UserDTO> findAll()
    {
        return userImplement.findAllUsers();
    }

    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody User user)
    {
        if(userImplement.updateUser(user).isPresent())
        {
            return ResponseEntity.ok("The user with the email: " + user.getUsername() + " was updated");
        }

        String message = "The user with the email: " + user.getUsername() + " was not found";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @PostMapping("/addFavorite/{eventPlaceId}/{userId}")
    public void addFavorite(@PathVariable Long eventPlaceId, @PathVariable Long userId)
    {
        userImplement.addFavorite(eventPlaceId, userId);
    }

    @DeleteMapping("/removeFromFavorites/{eventPlaceId}/{userId}")
    public void removeFromFavorites(@PathVariable Long eventPlaceId, @PathVariable Long userId)
    {
        userImplement.deleteFromFavorites(eventPlaceId, userId);
    }

    @GetMapping("/findAllFavorites/{userId}")
    public ResponseEntity<Set<EventPlaceDTO>> findAllFavorites(@PathVariable Long userId)
    {
        return ResponseEntity.ok(userImplement.findFavorites(userId));
    }



    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findUserById(@PathVariable Long id, @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        String username = jwtUtil.extractClaimUsername(token);

        UserDTO userDTO = userImplement.findUserById(id, username);

        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> data) {

        String email = data.get("username");
        String password = data.get("password");


        Authentication authentication = daoAuthenticationProvider.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userImplement.loadUserByUsername(email);

        String token = jwtUtil.generateToken(userDetails);
        JSONObject response = new JSONObject();
        response.put("token", token);
        response.put("name", userRepository.findByUsername(email).get().getName());
        response.put("lastName", userRepository.findByUsername(email).get().getLastName());
        response.put("id", userRepository.findByUsername(email).get().getId());
        response.put("userType", userRepository.findByUsername(email).get().getRole().getName());
        response.put("userName", userRepository.findByUsername(email).get().getUsername());

        return ResponseEntity.ok(response.toString());
    }

    @DeleteMapping("/deleteUserById/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        userImplement.deleteUserById(id);
        return ResponseEntity.ok("User with the id: " + id + " was deleted.");
    }

    @PutMapping("/changeRole")
    public ResponseEntity<String> changeUserRole() {
        String changedRole = userImplement.changeUserRole();
        return ResponseEntity.ok(changedRole);
    }
}
