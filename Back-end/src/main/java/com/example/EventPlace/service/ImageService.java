package com.example.EventPlace.service;


import com.example.EventPlace.domain.Image;
import com.example.EventPlace.dto.ImageDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {
    public void addImages(List<MultipartFile> file, Long id);

    ImageDTO toDTO(Image image);

    Image toEntity(ImageDTO imageDTO);
}
