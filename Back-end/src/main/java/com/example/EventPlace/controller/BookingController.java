package com.example.EventPlace.controller;

import java.util.List;
import com.example.EventPlace.dto.BookingDTO;
import com.example.EventPlace.dto.DateDTO;
import com.example.EventPlace.exceptions.ResourceNotFoundException;
import com.example.EventPlace.service.implement.BookingImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/booking")
public class BookingController {


    private BookingImplement bookingImplement;

    @Autowired
    public BookingController(BookingImplement bookingImplement) {
        this.bookingImplement = bookingImplement;
    }

    @PostMapping("/addBooking")
    public ResponseEntity<BookingDTO> addBooking(@RequestBody BookingDTO bookingDTO) {
        if (bookingDTO.getUser_id() == null || bookingDTO.getEventPlace_id() == null || bookingDTO.getAmountOfPeople() == null) {
            return ResponseEntity.badRequest().build();
        }
        BookingDTO savedBooking = bookingImplement.addBooking(bookingDTO);
        return ResponseEntity.ok(savedBooking);
    }

    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity<String> deleteBookingById(@PathVariable Long id) throws ResourceNotFoundException {

        if (bookingImplement.findBookingById(id).isEmpty()) {
            return ResponseEntity.badRequest().body("T");
        }
        bookingImplement.deleteBookingById(id);
        return ResponseEntity.ok("Booking deleted!");
    }

    @GetMapping("/findBookingById/{id}")
    public ResponseEntity<BookingDTO> findBookingById(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(bookingImplement.findBookingById(id).get());
    }

    @GetMapping("/findBookingByUser/{id}/{eventPlaceId}")
    public ResponseEntity<List<BookingDTO>> findBookingByUser(@PathVariable Long id, @PathVariable Long eventPlaceId) throws ResourceNotFoundException {
        return ResponseEntity.ok(bookingImplement.findBookingByUserId(id, eventPlaceId));
    }

    @GetMapping("/notAvailableDates/{id}")
    public ResponseEntity<List<DateDTO>> findNotAvailableDates(@PathVariable Long id)
    {
        return ResponseEntity.ok(bookingImplement.findNotAvailableDates(id));
    }

    @PutMapping("/updateBooking/{id}")
    public ResponseEntity <List<BookingDTO>> updateBooking(@PathVariable Long id, @RequestBody BookingDTO bookingDTO) throws ResourceNotFoundException {
        bookingDTO.setId(id);
        List<BookingDTO>  updatedBookingDTO = bookingImplement.updateBooking(bookingDTO);
        return ResponseEntity.ok(updatedBookingDTO);
    }

    @GetMapping ("/findAllBookingUsers/{id}")
    public ResponseEntity<List<BookingDTO>> findBookingAllUser (@PathVariable Long id){
        List<BookingDTO> bookingDTOList= bookingImplement.findByUser(id);
        return ResponseEntity.ok(bookingDTOList);
    }


}
