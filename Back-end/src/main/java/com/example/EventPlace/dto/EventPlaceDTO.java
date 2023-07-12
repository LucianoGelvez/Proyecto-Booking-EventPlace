package com.example.EventPlace.dto;

import com.example.EventPlace.domain.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class EventPlaceDTO {
    private Long id;

    private String name;

    private Double pricePerDay;

    private Integer maxCapacity;

    private Integer minCapacity;

    private String description;

    private Long ownerId;
    private String ownerName;

    private String healthAndSecurity;

    private String rulesOfThePlace;

    private String cancelationPolicies;

    private Set<BookingDTO> bookingList = new HashSet<>();

    private Characteristics characteristics;

    private Location location;

    private CityDTO city;

    private Set<BasicServiceDTO> basicServices = new HashSet<>();

    private Double Totalrating;
    private Set<ImageDTO> listImages = new HashSet<>();
    private Set<RateDTO> listRates = new HashSet<>();

    private CategoryDTO categories;
    public void addImage(ImageDTO image) {
        listImages.add(image);
    }
}
