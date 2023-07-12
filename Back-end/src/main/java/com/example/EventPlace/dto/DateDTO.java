package com.example.EventPlace.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class DateDTO {

    private LocalDate startDate;

    private LocalDate endDate;
}
