package com.example.EventPlace.service.implement;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.EventPlace.domain.EventPlace;
import com.example.EventPlace.domain.Image;
import com.example.EventPlace.dto.ImageDTO;
import com.example.EventPlace.repository.EventPlaceRepository;
import com.example.EventPlace.repository.ImageRepository;
import com.example.EventPlace.service.ImageService;
import lombok.Builder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.util.*;

@Builder
@Service
public class ImageImplement implements ImageService {

    private ImageRepository imageRepository;

    private EventPlaceRepository eventPlaceRepository;

    @Transactional
    @Override
    public void addImages(List<MultipartFile> files, Long id) {
        EventPlace eventPlace = eventPlaceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("EventPlace not found with id: " + id));


        String accessKey = "*";
        String secretKey = "*";
        String region = "*";
        String bucketName = "*";

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();

        Set<Image> imageList = new HashSet<>();
        int imageIndex = 1;

        for (MultipartFile file : files) {
            Image image = new Image();
            String uniqueFilename = "event" + id + "" + imageIndex + ".png";
            String s3Key = "images/" + uniqueFilename;
            String imageUrl = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + s3Key;
            image.setUrl(imageUrl);
            image.setEventPlace(eventPlace);

            try {
                byte[] bytes = file.getBytes();
                InputStream inputStream = new ByteArrayInputStream(bytes);
                ObjectMetadata metadata = new ObjectMetadata();
                metadata.setContentLength(bytes.length);
                metadata.setContentType("image/png");

                PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3Key, inputStream, metadata);
                s3Client.putObject(putObjectRequest);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            imageList.add(image);
            imageIndex++;
        }

        eventPlace.setListImages(imageList);
        eventPlaceRepository.save(eventPlace);
    }



    @Override
    public ImageDTO toDTO(Image image) {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(image.getId());
        imageDTO.setUrl(image.getUrl());
        return imageDTO;
    }

    @Override
    public Image toEntity(ImageDTO imageDTO) {
        Image image = new Image();
        image.setId(imageDTO.getId());
        image.setUrl(imageDTO.getUrl());
        return image;
    }

}
