package com.example.EventPlace.dto;

import com.example.EventPlace.domain.EventPlace;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImageDTO {
    private Long id;
    private String url;

}
