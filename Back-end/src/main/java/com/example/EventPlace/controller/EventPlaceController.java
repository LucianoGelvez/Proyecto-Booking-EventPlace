package com.example.EventPlace.controller;

import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.dto.EventPlaceDTO;
import com.example.EventPlace.dto.RateDTO;
import com.example.EventPlace.exceptions.BadRequestException;
import com.example.EventPlace.exceptions.ResourceNotFoundException;
import com.example.EventPlace.service.implement.EventPlaceImplement;
import com.example.EventPlace.service.implement.ImageImplement;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/eventPlace")

public class EventPlaceController {

    EventPlaceImplement eventPlaceImplement;
    ImageImplement imageImplement;

    private static final Logger logger = LogManager.getLogger(EventPlaceController.class);


    public EventPlaceController(EventPlaceImplement eventPlaceImplement, ImageImplement imageImplement) {
        this.eventPlaceImplement = eventPlaceImplement;
        this.imageImplement = imageImplement;
    }

    @PostMapping("/images")
    void addImages(@ModelAttribute("files") List<MultipartFile> files, @RequestParam("id") Long id) {
        imageImplement.addImages(files, id);
    }

    @PostMapping("/addPlace")
    ResponseEntity<Long> addPlace(@RequestBody EventPlace eventPlace) throws BadRequestException {
       return ResponseEntity.ok(eventPlaceImplement.registrerEventPlace(eventPlace));
    }

    @GetMapping
    ResponseEntity<List<EventPlaceDTO>> findAll()
    {
        return ResponseEntity.ok(eventPlaceImplement.findAllPlaces());
    }


    @DeleteMapping("/deletePlaceById/{id}")
    void deleteById(@PathVariable Long id) {
        eventPlaceImplement.deleteById(id);
    }

    @GetMapping("/{id}")
    EventPlaceDTO findById(@PathVariable Long id) throws ResourceNotFoundException {
        return eventPlaceImplement.findById(id);
    }

    @PostMapping("/rate")
    public ResponseEntity<Double> rateEventPlace(@RequestBody RateDTO rateDTO)
    {
        return ResponseEntity.ok(eventPlaceImplement.calculateRating(rateDTO));
    }
    @PostMapping("/updateCategory/{id}/{category}")
    public ResponseEntity<String> updateCategory(@PathVariable Long id, @PathVariable String category)
    {
        eventPlaceImplement.updateEventPlaceCategory(id, category);
        return ResponseEntity.ok("Event place with id: " + id + " has this category now: " + category);
    }

    @GetMapping("findByOwner/{id}")
    public ResponseEntity<List<EventPlaceDTO>> findByOwnerUser(@PathVariable Long id)
    {
        return ResponseEntity.ok(eventPlaceImplement.findByUser(id));
    }

}
