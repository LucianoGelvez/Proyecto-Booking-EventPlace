package com.example.EventPlace.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class EventPlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categories_id", referencedColumnName = "id")
    private Category category;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User ownerUser;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "user_favorite",
            joinColumns = @JoinColumn(name = "event_place_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> usersFavorites = new HashSet<>();


    private Double pricePerDay;

    private Integer maxCapacity;

    private Integer minCapacity;

    private String description;

    private String healthAndSecurity;

    private String rulesOfThePlace;

    private String cancelationPolicies;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id",referencedColumnName = "id")
    private Location location;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "characteristics_id",referencedColumnName = "id")
    private Characteristics characteristics;

    @OneToMany(mappedBy = "eventPlace", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Image> listImages = new HashSet<>();


    @OneToMany(mappedBy = "eventPlace", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Rate> listRate = new HashSet<>();

    private Double TotalRating;

    @OneToMany(mappedBy = "eventPlace", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<BasicService> basicServices = new HashSet<>();

    @OneToMany(mappedBy = "eventPlace", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Booking> bookingList = new HashSet<>();

    public void addImage(Image image) {
        listImages.add(image);


    }

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
    private City city;



}
