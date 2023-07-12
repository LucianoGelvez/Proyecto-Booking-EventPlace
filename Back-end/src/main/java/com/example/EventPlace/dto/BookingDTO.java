package com.example.EventPlace.dto;

import com.example.EventPlace.domain.BasicService;
import com.example.EventPlace.domain.Location;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@NoArgsConstructor
@Getter
@Setter
@ToString
public class BookingDTO {


    private Long id;

    private Long eventPlace_id;

    private  String eventPLace_name;

    private CategoryDTO categoryDTO;

    private Long user_id;

    private CityDTO cityDTO;

    private Location location;

    private Set<BasicServiceDTO> services = new HashSet<>();

    private Integer amountOfPeople;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean bookingcancellation;
}