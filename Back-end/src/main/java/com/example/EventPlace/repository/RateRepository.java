package com.example.EventPlace.repository;

import com.example.EventPlace.domain.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RateRepository  extends JpaRepository<Rate, Long> {
}
