package com.example.EventPlace.repository;

import com.example.EventPlace.domain.City;
import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findByNameCityAndStateAndCountry(String city, String state, String country);

}
