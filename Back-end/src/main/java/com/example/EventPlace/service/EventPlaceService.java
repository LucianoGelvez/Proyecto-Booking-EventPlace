package com.example.EventPlace.service;

import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.dto.EventPlaceDTO;
import com.example.EventPlace.exceptions.BadRequestException;
import com.example.EventPlace.exceptions.ResourceNotFoundException;

import java.util.List;

public interface EventPlaceService {

    Long registrerEventPlace(EventPlace eventPlace) throws BadRequestException;

    List<EventPlaceDTO> findByUser(Long id);

    List<EventPlaceDTO> findAllPlaces();

    void  deleteById(Long id);

    EventPlaceDTO eventPlaceAEventPlaceDTO(EventPlace eventPlace);

    EventPlace eventPlaceDTOAEventPlace(EventPlaceDTO eventPlaceDTO);

    EventPlaceDTO findById(Long id) throws ResourceNotFoundException;
}
