package com.example.EventPlace.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class BasicServiceDTO {

    private Long id;

    private String name;

    private Double price;
}
