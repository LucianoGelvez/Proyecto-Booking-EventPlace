package com.example.EventPlace.service;

import com.example.EventPlace.domain.City;
import com.example.EventPlace.dto.CityDTO;
import com.example.EventPlace.exceptions.BadRequestException;
import com.example.EventPlace.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface CityService {
    List<CityDTO> addCity(CityDTO cityDto);

    Optional<CityDTO> findCity(Long id) throws ResourceNotFoundException, BadRequestException;
    List<CityDTO> deleteCity(Long id) throws ResourceNotFoundException, BadRequestException;
    List<CityDTO> update(CityDTO cityDto) throws ResourceNotFoundException;
    List<CityDTO> listCities() throws ResourceNotFoundException;
}