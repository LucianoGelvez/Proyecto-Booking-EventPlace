package com.example.EventPlace.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter

public enum Permission {

    READ_EVENTS,
    CREATE_EVENTS,
    UPDATE_EVENTS,
    DELETE_EVENTS,
    READ_USERS,
    CREATE_USERS,
    UPDATE_USERS,
    DELETE_USERS,
    READ_ROLE,
    CREATE_ROLE,
    UPDATE_ROLE,
    DELETE_ROLE,
    READ_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    RATE_EVENTS,
    READ_CITY,
    CREATE_CITY,
    UPDATE_CITY,
    DELETE_CITY,
    CREATE_FAVORITES,
    DELETE_FAVORITES,
    READ_FAVORITES,
    READ_BOOKING,
    CREATE_BOOKING,
    UPDATE_BOOKING,
    DELETE_BOOKING,
    UPDATE_PROFILE

}
