package com.example.EventPlace.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String title;


    private String description;


    private String urlImage;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<EventPlace> eventPlaces = new HashSet<>();

    public Category(String title, String description, String urlImage) {
        this.title = title;
        this.description = description;
        this.urlImage = urlImage;
    }

    public Category(String title) {
        this.title = title;
    }
}
