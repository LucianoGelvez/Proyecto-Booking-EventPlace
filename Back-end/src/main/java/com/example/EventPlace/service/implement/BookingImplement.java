package com.example.EventPlace.service.implement;

import com.example.EventPlace.domain.BasicService;
import com.example.EventPlace.domain.Booking;
import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.domain.User;
import com.example.EventPlace.dto.BasicServiceDTO;
import com.example.EventPlace.dto.BookingDTO;
import com.example.EventPlace.dto.DateDTO;
import com.example.EventPlace.email.EmailSender;
import com.example.EventPlace.exceptions.ResourceNotFoundException;
import com.example.EventPlace.repository.BasicServiceRepository;
import com.example.EventPlace.repository.BookingRepository;
import com.example.EventPlace.repository.EventPlaceRepository;
import com.example.EventPlace.repository.UserRepository;
import com.example.EventPlace.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingImplement implements BookingService {

    private BookingRepository bookingRepository;

    private UserRepository userRepository;


    private EmailSender emailSender;

    private EventPlaceRepository eventPlaceRepository;

    private BasicServiceImplement basicServiceImplement;

    private BasicServiceRepository basicServiceRepository;

    private CategoryImplement categoryImplement;

    private CityImplement cityImplement;


    @Autowired
    public BookingImplement(BookingRepository bookingRepository, UserRepository userRepository, EmailSender emailSender, EventPlaceRepository eventPlaceRepository, BasicServiceImplement basicServiceImplement, BasicServiceRepository basicServiceRepository, CategoryImplement categoryImplement, CityImplement cityImplement) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
        this.eventPlaceRepository = eventPlaceRepository;
        this.basicServiceImplement = basicServiceImplement;
        this.basicServiceRepository = basicServiceRepository;
        this.categoryImplement = categoryImplement;
        this.cityImplement = cityImplement;
    }

    @Override
    public BookingDTO BookingToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setUser_id(booking.getUser().getId());
        bookingDTO.setEventPlace_id(booking.getEventPlace().getId());
        bookingDTO.setEventPLace_name(booking.getEventPlace().getName());
        bookingDTO.setAmountOfPeople(booking.getAmountOfPeople());
        bookingDTO.setStartDate(booking.getStartDate());
        bookingDTO.setEndDate(booking.getEndDate());
        bookingDTO.setBookingcancellation(booking.isBookingcancellation());
        bookingDTO.setCategoryDTO(categoryImplement.toDTO(booking.getEventPlace().getCategory()));
        bookingDTO.setCityDTO(cityImplement.cityToCityDTO(booking.getEventPlace().getCity()));
        bookingDTO.setLocation(booking.getEventPlace().getLocation());



        Set<BasicServiceDTO> basicServiceDTOS = new HashSet<>();
        for (BasicService basicService: booking.getServices()) {
            basicServiceDTOS.add(basicServiceImplement.toDTO(basicService));
        }
        bookingDTO.setServices(basicServiceDTOS);

        return bookingDTO;
    }

    @Override
    public Booking BookingDTOToBooking(BookingDTO bookingDTO)
    {
        Booking booking = new Booking();
        booking.setId(bookingDTO.getId());
        booking.setUser(userRepository.findById(bookingDTO.getUser_id()).get());
        booking.setEventPlace(eventPlaceRepository.findById(bookingDTO.getEventPlace_id()).get());
        booking.setAmountOfPeople(bookingDTO.getAmountOfPeople());
        booking.setStartDate(bookingDTO.getStartDate());
        booking.setEndDate(bookingDTO.getEndDate());
        booking.setBookingcancellation(bookingDTO.isBookingcancellation());

        Set<BasicService> basicServices = new HashSet<>();
        for (BasicServiceDTO basicServiceDTO: bookingDTO.getServices()) {
            basicServices.add(basicServiceImplement.toEntity(basicServiceDTO));
        }
        booking.setServices(basicServices);

        return booking;
    }

    @Override
    public List<BookingDTO> updateBooking(BookingDTO bookingDTO) throws ResourceNotFoundException {
        Long bookingId = bookingDTO.getId();
        Booking existingBooking = bookingRepository.findById(bookingId).orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        existingBooking.setAmountOfPeople(bookingDTO.getAmountOfPeople());
        existingBooking.setStartDate(bookingDTO.getStartDate());
        existingBooking.setEndDate(bookingDTO.getEndDate());
        existingBooking.setBookingcancellation(bookingDTO.isBookingcancellation());

        Booking updatedBooking = bookingRepository.save(existingBooking);
        List<BookingDTO> bookingDTOList= new ArrayList<>();
        User user = userRepository.findById(bookingDTO.getUser_id()).get();
        List<Booking>bookingList=bookingRepository.findByUser(user);
        for (Booking booking1 : bookingList) {
            bookingDTOList.add(BookingToBookingDTO(booking1));

        }
        return bookingDTOList;
    }

    public List<DateDTO> findNotAvailableDates(Long id)
    {
        EventPlace eventPlace = eventPlaceRepository.findById(id).get();
        List<Booking> bookingList = bookingRepository.findByEventPlace(eventPlace);
        List<DateDTO> dateList = new ArrayList<>();
        for (Booking booking: bookingList) {
            DateDTO dateDTO = new DateDTO();
            if(booking.isBookingcancellation())
            {
                dateDTO.setStartDate(booking.getStartDate());
                dateDTO.setEndDate(booking.getEndDate());
                dateList.add(dateDTO);
            }
        }
        return dateList;
    }

    @Override
    public BookingDTO addBooking(BookingDTO bookingDTO1) {
        emailSender.send(userRepository.findById(bookingDTO1.getUser_id()).get().getUsername(), buildEmail(userRepository.findById(bookingDTO1.getUser_id()).get().getName(), eventPlaceRepository.findById(bookingDTO1.getEventPlace_id()).get().getName(), bookingDTO1.getStartDate().toString(), bookingDTO1.getEndDate().toString()));
        Set<BasicServiceDTO> basicServiceDTOS = new HashSet<>();
        for (BasicServiceDTO basicServiceDTO: bookingDTO1.getServices()) {
            basicServiceDTOS.add(basicServiceImplement.toDTO(basicServiceRepository.findById(basicServiceDTO.getId()).get()));
        }
        bookingDTO1.setServices(basicServiceDTOS);
        Booking booking= BookingDTOToBooking(bookingDTO1);
        booking.setBookingcancellation(true);
        bookingRepository.save(booking);
        return BookingToBookingDTO(booking);

    }


    @Override
    public void deleteBookingById(Long id) throws ResourceNotFoundException
    {
        if(bookingRepository.findById(id).isEmpty())
        {
            throw new ResourceNotFoundException("That booking was not found");
        }
        Booking booking = bookingRepository.findById(id).get();
        booking.setServices(null);
        bookingRepository.save(booking);
        bookingRepository.deleteById(id);
    }


    @Override
    public Optional<BookingDTO> findBookingById(Long id) throws ResourceNotFoundException {
        if(bookingRepository.findById(id).isEmpty())
        {
            throw new ResourceNotFoundException("That booking was not found");
        }
        return Optional.of(BookingToBookingDTO(bookingRepository.findById(id).get()));
    }

    public List<BookingDTO> findBookingByUserId(Long id, Long eventPlaceId)
    {
        User user = userRepository.findById(id).get();
        EventPlace eventPlace = eventPlaceRepository.findById(eventPlaceId).get();
        List<Booking> bookingList = bookingRepository.findByUserAndEventPlace(user, eventPlace);
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        for (Booking booking: bookingList) {
            bookingDTOS.add(BookingToBookingDTO(booking));
        }
        return bookingDTOS;
    }

    public  List<BookingDTO> findByUser(Long id){
        List<BookingDTO> bookingDTOList = new ArrayList<>();
        List<Booking> findUser= bookingRepository.findByUser(userRepository.findById(id).get());
        for (Booking booking : findUser) {
            bookingDTOList.add(BookingToBookingDTO(booking));
        }
        return bookingDTOList;
    }

    private String buildEmail(String name, String eventPlaceName, String checkIn, String checkOut) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Your reservation is confirmed! </span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#EE5D1A\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for booking with us! </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">  </p></blockquote>\n You have an event at " + eventPlaceName +  "<p> CheckIn: "  + checkIn +  "</p>" + "<p> Checkout: "  + checkOut +  "</p>" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

}