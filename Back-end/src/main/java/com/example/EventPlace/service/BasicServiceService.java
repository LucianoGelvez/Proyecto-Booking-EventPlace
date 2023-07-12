package com.example.EventPlace.service;

import com.example.EventPlace.domain.BasicService;
import com.example.EventPlace.dto.BasicServiceDTO;

import java.util.List;

public interface BasicServiceService {
    BasicService toEntity(BasicServiceDTO basicServiceDTO);
    public BasicServiceDTO toDTO(BasicService basicService);
}
