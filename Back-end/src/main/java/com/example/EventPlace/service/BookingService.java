package com.example.EventPlace.service;

import com.example.EventPlace.domain.Booking;
import com.example.EventPlace.dto.BookingDTO;
import com.example.EventPlace.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    BookingDTO BookingToBookingDTO(Booking booking);




    Booking BookingDTOToBooking(BookingDTO bookingDTO);

    List<BookingDTO> updateBooking (BookingDTO bookingDTO)throws ResourceNotFoundException;

    BookingDTO addBooking(BookingDTO bookingDTO1);

    void deleteBookingById(Long id) throws ResourceNotFoundException;


    Optional<BookingDTO> findBookingById(Long id) throws ResourceNotFoundException;
}
