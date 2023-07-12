package com.example.EventPlace.controller;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.EventPlace.domain.Message;
import com.example.EventPlace.domain.User;
import com.example.EventPlace.service.implement.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private MessageService messageService;


    @PostMapping()
    public ResponseEntity<String> addImages(@RequestParam("file") MultipartFile file) {

        List<Message> listMessages = messageService.findAllMessages();
        Integer id = listMessages.size();
        Integer finalId = id + 1;

        String accessKey = "*";
        String secretKey = "*";
        String region = "us-east-2";
        String bucketName = "*";

        String uniqueFilename = "profile/" + finalId +".png";
        String s3Url = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + uniqueFilename;

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region) // Reemplaza con la región de tu bucket
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();

        try {
            byte[] bytes = file.getBytes();
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(bytes.length);
            metadata.setContentType("profile/png");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFilename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(s3Url);
    }

}