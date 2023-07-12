package com.example.EventPlace.repository;

import com.example.EventPlace.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
