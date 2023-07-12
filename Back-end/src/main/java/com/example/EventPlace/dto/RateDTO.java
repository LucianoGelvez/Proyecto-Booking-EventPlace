package com.example.EventPlace.dto;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RateDTO {


    private Long id;
    private String comment;
    private Double rate;
    private Long eventPlace_id;
    private String user;

}
