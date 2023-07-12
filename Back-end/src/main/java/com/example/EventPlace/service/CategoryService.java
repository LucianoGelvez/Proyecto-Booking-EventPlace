package com.example.EventPlace.service;

import com.example.EventPlace.domain.Category;
import com.example.EventPlace.dto.CategoryDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    Long addCategory(CategoryDTO categoryDTO) ;
    CategoryDTO updateCategory(CategoryDTO categoryDTO) ;
    CategoryDTO findCategory(Long id);
    List<CategoryDTO> findAllCategories();
    void deleteCategory(Long id) ;

    void addImages(MultipartFile file, Long id);

    Category toEntity (CategoryDTO categoryDTO);
    CategoryDTO toDTO (Category category);
}
