package com.example.EventPlace.service.implement;

import com.example.EventPlace.domain.BasicService;
import com.example.EventPlace.dto.BasicServiceDTO;
import com.example.EventPlace.service.BasicServiceService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Builder
@Service
public class BasicServiceImplement implements BasicServiceService {

    @Override
    public BasicService toEntity(BasicServiceDTO basicServiceDTO) {
        BasicService basicService = new BasicService();
        basicService.setId(basicServiceDTO.getId());
        basicService.setName(basicServiceDTO.getName());
        basicService.setPrice(basicServiceDTO.getPrice());
        return basicService;
    }

    @Override
    public BasicServiceDTO toDTO(BasicService basicService) {
        BasicServiceDTO basicServiceDTO = new BasicServiceDTO();
        basicServiceDTO.setId(basicService.getId());
        basicServiceDTO.setName(basicService.getName());
        basicServiceDTO.setPrice(basicService.getPrice());
        return basicServiceDTO;
    }




}
