package com.example.EventPlace.controller;

import com.example.EventPlace.dto.CategoryDTO;
import com.example.EventPlace.service.implement.CategoryImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categories")
public class CategorieController {


    private CategoryImplement categoryService;

    @Autowired
    public CategorieController(CategoryImplement categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Long> addCategory(@RequestBody CategoryDTO categoryDTO) {
        Long addedCategorie = categoryService.addCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCategorie);
    }


    @PostMapping("/images")
    void addImages(@ModelAttribute("file") MultipartFile file, @RequestParam("id") Long id) {
        categoryService.addImages(file, id);
    }



    @PutMapping("/updateCategory")
    public ResponseEntity<CategoryDTO> updateCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO categoryToSave= categoryService.updateCategory(categoryDTO);
        return ResponseEntity.ok(categoryToSave);
    }

    @GetMapping("findCategory/{id}")
    public ResponseEntity<CategoryDTO> findCategory(@PathVariable Long id) {
        CategoryDTO categoriyToFind = categoryService.findCategory(id);
        return ResponseEntity.ok(categoriyToFind);
    }

    @GetMapping("/allCategories")
    public ResponseEntity<List<CategoryDTO>> findAllCategories() {
        List<CategoryDTO> categories = categoryService.findAllCategories();
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("deleteCategory/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }


}
