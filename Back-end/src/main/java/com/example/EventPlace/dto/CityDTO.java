package com.example.EventPlace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CityDTO {
    private Long id;

    private String nameCity;

    private String state;

    private String country;

}
