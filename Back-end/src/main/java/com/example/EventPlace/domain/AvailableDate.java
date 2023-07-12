package com.example.EventPlace.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "availableDate")
public class AvailableDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "eventPlace_id")
    private EventPlace eventPlace;
}
