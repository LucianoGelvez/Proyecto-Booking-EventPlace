package com.example.EventPlace.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String state;

    private String nameCity;

    private String country;

    @OneToMany(mappedBy = "city", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private Set<EventPlace> eventPlaceSet;

}
