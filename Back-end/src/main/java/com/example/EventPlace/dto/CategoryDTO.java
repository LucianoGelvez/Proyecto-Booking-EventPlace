package com.example.EventPlace.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CategoryDTO {

    private Long id;

    private String title;

    private String description;

    private String urlImage;
}
