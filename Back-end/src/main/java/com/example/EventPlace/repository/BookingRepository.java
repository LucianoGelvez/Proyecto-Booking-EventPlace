package com.example.EventPlace.repository;

import com.example.EventPlace.domain.Booking;
import com.example.EventPlace.domain.EventPlace;
import java.util.List;

import com.example.EventPlace.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByEventPlace(EventPlace eventPlace);
    List<Booking> findByUserAndEventPlace(User user, EventPlace eventPlace);

    List<Booking> findByUser(User user);

}
