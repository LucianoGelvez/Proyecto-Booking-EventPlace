package com.example.EventPlace.dto;


import lombok.*;

@Data
public class ChangePasswordBody {

    private String token;
    private String password;
}
