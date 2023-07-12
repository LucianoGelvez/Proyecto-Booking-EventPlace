package com.example.EventPlace.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Characteristics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private Boolean pool;


    private Boolean outDoorAreas;


    private Boolean stage;


    private Boolean parkingLot;


    private Boolean wifi;


    private Boolean AC;

}
