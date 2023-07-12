package com.example.EventPlace.domain;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="message")
public class Message {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderName;

    private String receiverName;

    private String message;

    private Status status;

    private String imageUrl;

    private String otherUserUrlImage;
}
