package com.example.EventPlace.service.implement;

import com.example.EventPlace.domain.City;
import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.dto.CityDTO;
import com.example.EventPlace.exceptions.BadRequestException;
import com.example.EventPlace.exceptions.ResourceNotFoundException;
import com.example.EventPlace.repository.CityRepository;
import com.example.EventPlace.repository.EventPlaceRepository;
import com.example.EventPlace.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CityImplement implements CityService {


    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private EventPlaceRepository eventPlaceRepository;

    @Autowired
    @Lazy
    private EventPlaceImplement eventPlaceImplement;




    public City cityDTOToCity(CityDTO cityDTO){
        City city = new City();
        city.setId(cityDTO.getId());
        city.setNameCity(cityDTO.getNameCity());
        city.setState(cityDTO.getState());
        city.setCountry(cityDTO.getCountry());

        return city;
    }

    public CityDTO cityToCityDTO(City city){
        CityDTO cityDTO   = new CityDTO();


        cityDTO.setId(city.getId());
        cityDTO.setState(city.getState());
        cityDTO.setCountry(city.getCountry());
        cityDTO.setNameCity(city.getNameCity());

        return cityDTO;
    }

    @Override
    public List<CityDTO>  addCity(CityDTO cityDto)  {
        List<CityDTO> responese= new ArrayList<>() ;
        if (cityDto.getNameCity().isEmpty() || cityDto.getCountry().isEmpty() || cityDto.getState().isEmpty()){
            throw new RuntimeException("you need to fill in all the data");
        }else {
            cityRepository.save(cityDTOToCity(cityDto));
            List<City> listCities = cityRepository.findAll();
            for (City city : listCities) {
                responese.add(cityToCityDTO(city));
            }
        }
        return responese;
    }

    public CityDTO addCities (CityDTO cityDTO){
        return cityToCityDTO(cityRepository.save(cityDTOToCity(cityDTO)));
    }

    @Override
    public Optional<CityDTO> findCity(Long id) throws BadRequestException {
        Optional<City> foundCity = cityRepository.findById(id) ;
        if(foundCity.isPresent()){
            return Optional.of(cityToCityDTO(foundCity.get()));
        }else {
            throw new BadRequestException("Error. The searched city was not found");
        }
    }

    @Override
    public List<CityDTO> deleteCity(Long id) throws ResourceNotFoundException, BadRequestException {
        Optional<CityDTO> cityToDelete = findCity(id);
        List<CityDTO> responese= new ArrayList<>() ;

        if (cityToDelete.isPresent()){
             Set<EventPlace> eventPlaceSet = eventPlaceRepository.findByCity(cityRepository.findById(id).get());
             if(!eventPlaceSet.isEmpty())
             {
            for (EventPlace eventPlace: eventPlaceSet) {
                eventPlaceImplement.deleteById(eventPlace.getId());
            }
             }
            cityRepository.deleteById(id);
            responese = listCities();
        }else {
            throw new ResourceNotFoundException("Error. The city registered with the id was not found: "+ id);
        }
        return responese;
    }

    @Override
    public List<CityDTO> update(CityDTO cityDto) throws ResourceNotFoundException {
        City updatedCity;
        Optional<City> cityToUpdate = cityRepository.findById(cityDto.getId());
        List<CityDTO> responese= new ArrayList<>() ;
        if (cityToUpdate.isPresent()){
            updatedCity = cityRepository.save(cityDTOToCity(cityDto));
            List<City> listCities = cityRepository.findAll();
            for (City city : listCities) {
                responese.add(cityToCityDTO(city));
            }
        }else{
            throw new ResourceNotFoundException("Error. The city to update was not found");
        }
        return responese;
    }

    @Override
    public List<CityDTO> listCities() throws ResourceNotFoundException {
        List<City> findAll = cityRepository.findAll();
        List<CityDTO> finAllDTO = new ArrayList<>();

        if(findAll.isEmpty()){
            throw new ResourceNotFoundException("Error. No Cities were added, the list is empty");
        }
        else {
            for (City city: findAll){
                finAllDTO.add(cityToCityDTO(city));
            }
        }
        return finAllDTO;
    }
}