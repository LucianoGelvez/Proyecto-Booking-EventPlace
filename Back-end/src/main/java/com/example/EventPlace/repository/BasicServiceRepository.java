package com.example.EventPlace.repository;

import com.example.EventPlace.domain.BasicService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BasicServiceRepository extends JpaRepository<BasicService, Long> {
}
