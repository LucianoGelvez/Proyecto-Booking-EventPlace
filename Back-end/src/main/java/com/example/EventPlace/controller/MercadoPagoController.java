package com.example.EventPlace.controller;

import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.dto.EventPlaceDTO;
import com.example.EventPlace.repository.EventPlaceRepository;
import com.example.EventPlace.service.implement.EventPlaceImplement;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pay")
public class MercadoPagoController {

    @Autowired
    private EventPlaceRepository eventPlaceRepository;

    @Autowired
    private EventPlaceImplement eventPlaceImplement;

    @PostMapping
    @ResponseBody
    public ResponseEntity<Map<String, String>> createPreference(@RequestBody Map<String, Object> requestBody) {
        try {
            MercadoPagoConfig.setAccessToken("TEST-*");
            PreferenceClient client = new PreferenceClient();

            String description = (String) requestBody.get("description");
            BigDecimal price = new BigDecimal(String.valueOf(requestBody.get("price")));
            int quantity = (int) requestBody.get("quantity");


            PreferenceItemRequest itemRequest =
                    PreferenceItemRequest.builder()
                            .title(description)
                            .quantity(quantity)
                            .unitPrice(price)
                            .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            Long eventPlaceId = Long.valueOf((String) requestBody.get("eventPlace_id"));
            EventPlaceDTO eventPlace = eventPlaceImplement.eventPlaceAEventPlaceDTO(eventPlaceRepository.findById(eventPlaceId).get());


            PreferenceBackUrlsRequest backUrls =
                    PreferenceBackUrlsRequest.builder()
                            .success("http://*/" + String.valueOf(requestBody.get("eventPlace_id")) + "/" +
                                    String.valueOf(requestBody.get("user_id")) + "/" + String.valueOf(requestBody.get("amountOfPeople")) + "/" +
                                    String.valueOf(requestBody.get("startDate")) + "/" + String.valueOf(requestBody.get("endDate"))
                            + "/" + String.valueOf(requestBody.get("services")) + "/" +  eventPlace.getOwnerName() + "/" + eventPlace.getOwnerId()
                            + "/" + eventPlace.getName())
                            .failure("http://*")
                            .pending("http://*")
                            .build();

            PreferenceRequest request = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backUrls)
                    .autoReturn("approved")
                    .build();

            Preference preference = client.create(request);

            Map<String, String> response = new HashMap<>();
            response.put("id", preference.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
