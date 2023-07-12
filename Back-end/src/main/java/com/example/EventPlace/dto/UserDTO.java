package com.example.EventPlace.dto;

import com.example.EventPlace.domain.Location;
import com.example.EventPlace.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String name;
    private String lastName;
    private String username;
    private String nationalID;
    private Location location;
    private String profileImage;
    private CityDTO city;
    private Role role;
    private Set<EventPlaceDTO> listFavorites = new HashSet<>();

}