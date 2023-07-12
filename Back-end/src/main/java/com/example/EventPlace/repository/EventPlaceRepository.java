package com.example.EventPlace.repository;

import com.example.EventPlace.domain.City;
import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface EventPlaceRepository extends JpaRepository<EventPlace, Long> {

    List<EventPlace> findByOwnerUser(User user);
    Set<EventPlace> findByCity(City city);

}
