package com.example.EventPlace.service.implement;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.EventPlace.domain.Category;
import com.example.EventPlace.dto.CategoryDTO;
import com.example.EventPlace.repository.CategoryRepository;
import com.example.EventPlace.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryImplement implements CategoryService {

    private  CategoryRepository categoryRepository;

    private static final Logger LOGGER = Logger.getLogger(CategoryImplement.class);

    @Autowired
    public CategoryImplement(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Long addCategory(CategoryDTO categoryDTO) {
    if (categoryDTO.getTitle().isEmpty()|| categoryDTO.getDescription().isEmpty()){

    throw new RuntimeException("some of the fields are empty");

}else {
    Category category = toEntity(categoryDTO);
    Category savedCategory = categoryRepository.save(category);
    return savedCategory.getId();
}

    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO) {
        LOGGER.info("A category update operation was started with ID=" + categoryDTO.getId());
        Category existingCategory = categoryRepository.findById(categoryDTO.getId())
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryDTO.getId()));

        existingCategory.setTitle(categoryDTO.getTitle());
        existingCategory.setDescription(categoryDTO.getDescription());
        existingCategory.setUrlImage(categoryDTO.getUrlImage());

        Category updatedCategory = categoryRepository.save(existingCategory);
        LOGGER.info("Category updated successfully" + categoryDTO.getId());
        return toDTO(updatedCategory);

    }

    @Override
    public CategoryDTO findCategory(Long id) {
        Category category = categoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
        return toDTO(category);
    }

    @Override
    public List<CategoryDTO> findAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = new ArrayList<>();
        for (Category category: categories) {
            System.out.println(category);
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO = toDTO(category);
            categoriesDTO.add(categoryDTO);
        }

        return categoriesDTO;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }


    @Override
    public void addImages(MultipartFile file, Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        String accessKey = "*";
        String secretKey = "*";
        String region = "us-east-2";
        String bucketName = "*";

        String uniqueFilename = "categories/"+ id + ".png";

        String s3Url = "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + uniqueFilename;

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();

        try {
            byte[] bytes = file.getBytes();
            ByteArrayInputStream inputStream = new ByteArrayInputStream(bytes);
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(bytes.length);
            metadata.setContentType("categories/png");

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFilename, inputStream, metadata);
            s3Client.putObject(putObjectRequest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Actualiza la URL de la imagen en la categoría
        category.get().setUrlImage(s3Url);
        category.get().setDescription(category.get().getDescription());
        category.get().setTitle(category.get().getTitle());

        categoryRepository.save(category.get());
    }





    @Override
    public Category toEntity(CategoryDTO categoryDTO) {
        Category category = new Category();

        category.setTitle(categoryDTO.getTitle());
        category.setDescription(categoryDTO.getDescription());
        category.setUrlImage(categoryDTO.getUrlImage());


        return category;
    }

    @Override
    public CategoryDTO toDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();

        categoryDTO.setId(category.getId());
        categoryDTO.setTitle(category.getTitle());
        categoryDTO.setDescription(category.getDescription());
        categoryDTO.setUrlImage(category.getUrlImage());

        return categoryDTO;
    }





}
