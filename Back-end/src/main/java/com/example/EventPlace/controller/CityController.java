package com.example.EventPlace.controller;
import com.example.EventPlace.dto.CityDTO;
import com.example.EventPlace.exceptions.BadRequestException;
import com.example.EventPlace.exceptions.ResourceNotFoundException;
import com.example.EventPlace.service.implement.CityImplement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/cities")
public class CityController {


    private CityImplement cityImplement;

    @Autowired
    public CityController(CityImplement cityImplement) {
        this.cityImplement = cityImplement;
    }

    @PostMapping("/addCity")
    public ResponseEntity<List<CityDTO>> addCities(@RequestBody CityDTO cityDTO) {
        List<CityDTO> cityDTOToadd = cityImplement.addCity(cityDTO);
        return ResponseEntity.ok(cityDTOToadd);
    }

    @GetMapping("/allCities")
    public ResponseEntity<List<CityDTO>> listCities() throws ResourceNotFoundException {
        List<CityDTO> cities = cityImplement.listCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CityDTO>> findCity(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        Optional<CityDTO> cityToFind = cityImplement.findCity(id);
        return ResponseEntity.ok(cityToFind);
    }

    @PutMapping("/updateCity")
    public ResponseEntity<List<CityDTO>> updateCity(@RequestBody CityDTO cityDTO) throws ResourceNotFoundException {
        List<CityDTO> cityUpdate = cityImplement.update(cityDTO);
        return ResponseEntity.ok(cityUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<CityDTO>> deleteCity(@PathVariable Long id) throws BadRequestException, ResourceNotFoundException {
        return ResponseEntity.ok(cityImplement.deleteCity(id));
    }

}