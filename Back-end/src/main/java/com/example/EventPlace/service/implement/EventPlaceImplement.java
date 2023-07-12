package com.example.EventPlace.service.implement;

import com.example.EventPlace.domain.*;
import com.example.EventPlace.dto.*;
import com.example.EventPlace.exceptions.BadRequestException;
import com.example.EventPlace.exceptions.ResourceNotFoundException;
import com.example.EventPlace.repository.*;
import com.example.EventPlace.service.EventPlaceService;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class EventPlaceImplement implements EventPlaceService {
    private EventPlaceRepository eventPlaceRepository;
    private ImageImplement imageImplement;
    private BasicServiceRepository basicServiceRepository;

    private BasicServiceImplement basicServiceImplement;

    private UserRepository userRepository;

    private UserImplement userImplement;

    private CategoryRepository categoryRepository;

    private BookingImplement bookingImplement;

    private CityImplement cityImplement;

    private CityRepository cityRepository;

    private RateRepository rateRepository;

    private static final Logger logger = LogManager.getLogger(EventPlaceImplement.class);

    @Autowired
    public EventPlaceImplement(EventPlaceRepository eventPlaceRepository, ImageImplement imageImplement, BasicServiceRepository basicServiceRepository, BasicServiceImplement basicServiceImplement, UserRepository userRepository, UserImplement userImplement, CategoryRepository categoryRepository, BookingImplement bookingImplement, CityImplement cityImplement, CityRepository cityRepository, RateRepository rateRepository) {
        this.eventPlaceRepository = eventPlaceRepository;
        this.imageImplement = imageImplement;
        this.basicServiceRepository = basicServiceRepository;
        this.basicServiceImplement = basicServiceImplement;
        this.userRepository = userRepository;
        this.userImplement = userImplement;
        this.categoryRepository = categoryRepository;
        this.bookingImplement = bookingImplement;
        this.cityImplement = cityImplement;
        this.cityRepository = cityRepository;
        this.rateRepository = rateRepository;
    }

    public RateDTO rateToRateDTO(Rate rate)
    {
        RateDTO rateDTO = new RateDTO();
        rateDTO.setId(rate.getId());
        rateDTO.setComment(rate.getComment());
        rateDTO.setRate(rate.getRate());
        rateDTO.setEventPlace_id(rate.getEventPlace().getId());
        rateDTO.setUser(rate.getUser().getName());

        return rateDTO;
    }


    public Rate rateDTOToRate(RateDTO rateDTO)
    {
        Rate rate = new Rate();
        rate.setId(rateDTO.getId());
        rate.setComment(rateDTO.getComment());
        rate.setRate(rateDTO.getRate());
        rate.setEventPlace(eventPlaceRepository.findById(rateDTO.getEventPlace_id()).get());
        rate.setUser(userRepository.findByUsername(rateDTO.getUser()).get());

        return rate;
    }

    @Override
    public EventPlaceDTO eventPlaceAEventPlaceDTO(EventPlace eventPlace) {
        EventPlaceDTO eventPlaceDTO = new EventPlaceDTO();

        eventPlaceDTO.setId(eventPlace.getId());
        eventPlaceDTO.setPricePerDay(eventPlace.getPricePerDay());
        eventPlaceDTO.setTotalrating(eventPlace.getTotalRating());
        eventPlaceDTO.setName(eventPlace.getName());
        eventPlaceDTO.setCharacteristics(eventPlace.getCharacteristics());
        eventPlaceDTO.setDescription(eventPlace.getDescription());
        eventPlaceDTO.setMaxCapacity(eventPlace.getMaxCapacity());
        eventPlaceDTO.setMinCapacity(eventPlace.getMinCapacity());
        eventPlaceDTO.setLocation(eventPlace.getLocation());
        eventPlaceDTO.setCategories(categoryToCategoryDTO(eventPlace.getCategory()));
        eventPlaceDTO.setHealthAndSecurity(eventPlace.getHealthAndSecurity());
        eventPlaceDTO.setCancelationPolicies(eventPlace.getCancelationPolicies());
        eventPlaceDTO.setRulesOfThePlace(eventPlace.getRulesOfThePlace());
        eventPlaceDTO.setCity(cityImplement.cityToCityDTO(eventPlace.getCity()));
        eventPlaceDTO.setOwnerId(eventPlace.getOwnerUser().getId());
        eventPlaceDTO.setOwnerName(eventPlace.getOwnerUser().getName());

        Set<ImageDTO> imageDTOs = new HashSet<>();
        for (Image image : eventPlace.getListImages()) {
            ImageDTO imageDTO = imageImplement.toDTO(image);
            imageDTOs.add(imageDTO);
        }
        eventPlaceDTO.setListImages(imageDTOs);

        Set<BookingDTO> bookingDTOS = new HashSet<>();
        for (Booking booking : eventPlace.getBookingList()) {
            BookingDTO bookingDTO = bookingImplement.BookingToBookingDTO(booking);
            bookingDTOS.add(bookingDTO);
        }
        eventPlaceDTO.setBookingList(bookingDTOS);


        Set<RateDTO> rates = new HashSet<>();
        for (Rate rate : eventPlace.getListRate()) {
            RateDTO rateDTO = rateToRateDTO(rate);
            rates.add(rateDTO);
        }
        eventPlaceDTO.setListRates(rates);

        Set<BasicServiceDTO> basicServiceDTOs = new HashSet<>();
        for (BasicService basicService : eventPlace.getBasicServices()) {
            BasicServiceDTO basicServiceDTO = basicServiceImplement.toDTO(basicService);
            basicServiceDTOs.add(basicServiceDTO);
        }
        eventPlaceDTO.setBasicServices(basicServiceDTOs);

        return eventPlaceDTO;
    }

    public Category categoryDTOToCategory(CategoryDTO categoryDTO)
    {
        Category category = new Category();
        category.setTitle(categoryDTO.getTitle());
        category.setUrlImage(categoryDTO.getUrlImage());

        return category;
    }

    public CategoryDTO categoryToCategoryDTO(Category category)
    {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setDescription(category.getDescription());
        categoryDTO.setTitle(category.getTitle());
        categoryDTO.setId(category.getId());
        categoryDTO.setUrlImage(category.getUrlImage());

        return categoryDTO;
    }



    @Override
    public EventPlace eventPlaceDTOAEventPlace(EventPlaceDTO eventPlaceDTO) {
        EventPlace eventPlace = new EventPlace();

        eventPlace.setName(eventPlaceDTO.getName());
        eventPlace.setDescription(eventPlaceDTO.getDescription());
        eventPlace.setCharacteristics(eventPlaceDTO.getCharacteristics());
        eventPlace.setTotalRating(eventPlaceDTO.getTotalrating());
        eventPlace.setMaxCapacity(eventPlaceDTO.getMaxCapacity());
        eventPlace.setMinCapacity(eventPlaceDTO.getMinCapacity());
        eventPlace.setPricePerDay(eventPlaceDTO.getPricePerDay());
        eventPlace.setLocation(eventPlaceDTO.getLocation());
        eventPlace.setId(eventPlaceDTO.getId());
        eventPlace.setHealthAndSecurity(eventPlaceDTO.getHealthAndSecurity());
        eventPlace.setCancelationPolicies(eventPlaceDTO.getCancelationPolicies());
        eventPlace.setRulesOfThePlace(eventPlaceDTO.getRulesOfThePlace());

        Set<Image> images = new HashSet<>();
        for (ImageDTO imageDTO : eventPlaceDTO.getListImages()) {
            Image image = imageImplement.toEntity(imageDTO);
            image.setEventPlace(eventPlace);
            images.add(image);
        }
        eventPlace.setListImages(images);

        Set<Booking> booking = new HashSet<>();
        for (BookingDTO bookingDTO : eventPlaceDTO.getBookingList()) {
            Booking booking1 = bookingImplement.BookingDTOToBooking(bookingDTO);
            booking1.setEventPlace(eventPlace);
            booking.add(booking1);
        }
        eventPlace.setBookingList(booking);

        Set<Rate> rates = new HashSet<>();
        for (RateDTO rateDTO : eventPlaceDTO.getListRates()) {
            Rate rate = rateDTOToRate(rateDTO);
            rate.setEventPlace(eventPlace);
            rate.setUser(userRepository.findByUsername(rateDTO.getUser()).get());
            rates.add(rate);
        }
        eventPlace.setListRate(rates);

        Set<BasicService> basicServices = new HashSet<>();
        for (BasicServiceDTO basicServiceDTO : eventPlaceDTO.getBasicServices()) {
            BasicService basicService = basicServiceImplement.toEntity(basicServiceDTO);
            basicService.setEventPlace(eventPlace);
            basicServices.add(basicService);
        }
        eventPlace.setBasicServices(basicServices);

        return eventPlace;
    }


    @Override
    public Long registrerEventPlace(EventPlace eventPlace) throws BadRequestException {
        Set<BasicService> basicService = eventPlace.getBasicServices();
        for (BasicService basicService1: basicService) {
            basicService1.setEventPlace(eventPlace);
        }
        Optional<City> city = cityRepository.findByNameCityAndStateAndCountry(eventPlace.getCity().getNameCity(),
                eventPlace.getCity().getState(), eventPlace.getCity().getCountry());

        if(city.isEmpty())
        {
            throw new BadRequestException("That city does not exist in EventPlace");
        }

        eventPlace.setCity(city.get());
        eventPlace.setCategory(categoryRepository.findByTitle(eventPlace.getCategory().getTitle()).get());
        eventPlace.setOwnerUser(userRepository.findByUsername(eventPlace.getOwnerUser().getUsername()).get());
        eventPlace.setBasicServices(basicService);

        EventPlace eventPlace1 = eventPlaceRepository.save(eventPlace);
        return eventPlace1.getId();
    }

    @Override
    public List<EventPlaceDTO> findByUser(Long id)
    {
        logger.info("Someone searched places by user");
        User user = userRepository.findById(id).get();
        List<EventPlace> eventPlaces = eventPlaceRepository.findByOwnerUser(user);
        List<EventPlaceDTO> eventPlaceDTOs = new ArrayList<>();

        for (EventPlace eventPlace : eventPlaces) {
            EventPlaceDTO eventPlaceDTO = eventPlaceAEventPlaceDTO(eventPlace);
            eventPlaceDTOs.add(eventPlaceDTO);
        }

        return eventPlaceDTOs;
    }

    @Override
    public List<EventPlaceDTO> findAllPlaces() {
        logger.info("Someone searched all places");
        List<EventPlace> eventPlaces = eventPlaceRepository.findAll();
        List<EventPlaceDTO> eventPlaceDTOs = new ArrayList<>();

        for (EventPlace eventPlace : eventPlaces) {
            EventPlaceDTO eventPlaceDTO = eventPlaceAEventPlaceDTO(eventPlace);
            eventPlaceDTOs.add(eventPlaceDTO);
        }

        return eventPlaceDTOs;
    }

    @Override
    public void deleteById(Long id) {
        EventPlace eventPlace = eventPlaceRepository.findById(id).get();
        Set<Rate> rateList = eventPlace.getListRate();
        if(!rateList.isEmpty())
        {
        for (Rate rate: rateList) {
            rate.setEventPlace(null);
            System.out.println(rate);
            rateRepository.save(rate);
        }
        }
        eventPlaceRepository.deleteById(id);
    }


    @Override
    public EventPlaceDTO findById(Long id) throws ResourceNotFoundException {
        if(eventPlaceRepository.findById(id).isEmpty())
        {
            logger.error("Event Place was not found");
            throw new ResourceNotFoundException("EventPlace was not found");
        }
        return eventPlaceAEventPlaceDTO(eventPlaceRepository.findById(id).get());
    }

    public Double calculateRating(RateDTO rate) {
        Optional<EventPlace> eventPlaceToFind = eventPlaceRepository.findById(rate.getEventPlace_id());
        EventPlace eventPlace = eventPlaceToFind.get();
        Set<Rate> rateList = eventPlaceToFind.get().getListRate();

        rateList.add(rateDTOToRate(rate));

        Integer currentVotes = 1;

        Double totalVotes = 0.0;

        if (rateList.size() > 0) {
            currentVotes = rateList.size();
            for (Rate rate1 : rateList) {
                totalVotes += rate1.getRate();
            }
        }


        Double newRating = (totalVotes) / (currentVotes);

        eventPlace.setTotalRating(newRating);
        eventPlace.setListRate(rateList);

        eventPlaceRepository.save(eventPlace);

        return eventPlace.getTotalRating();
    }

    public void updateEventPlaceCategory(Long id, String categoryName)
    {
        EventPlace eventPlace = eventPlaceRepository.findById(id).get();
        Category category = categoryRepository.findByTitle(categoryName).get();
        eventPlace.setCategory(category);
        eventPlaceRepository.save(eventPlace);
    }

    public City cityDTOToCity(CityDTO cityDTO){
        City city = new City();
        city.setId(cityDTO.getId());
        city.setNameCity(cityDTO.getNameCity());
        city.setState(cityDTO.getState());
        city.setCountry(cityDTO.getCountry());

        return city;
    }

}
