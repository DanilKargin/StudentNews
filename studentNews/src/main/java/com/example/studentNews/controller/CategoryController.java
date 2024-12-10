package com.example.studentNews.controller;

import ch.qos.logback.core.encoder.EchoEncoder;
import com.example.studentNews.controller.domain.CategoryRequest;
import com.example.studentNews.controller.domain.CategoryResponse;
import com.example.studentNews.entity.Category;
import com.example.studentNews.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/list")
    public ResponseEntity<List<Category>> getFullList(){
        return ResponseEntity.ok(categoryService.getFullList());
    }
    @PostMapping("/create")
    public ResponseEntity<CategoryResponse> createCategory(@RequestBody CategoryRequest request){
        try {
            categoryService.create(request.getName());
            return ResponseEntity.ok(new CategoryResponse("Категория создана", ""));
        }catch(Exception e){
            return ResponseEntity.ok(new CategoryResponse("", "Такая категория уже существует"));
        }
    }
    @DeleteMapping("/delete")
    public ResponseEntity<CategoryResponse> deleteCategory(@RequestBody CategoryRequest request){
        try {
            categoryService.delete(request.getName());
            return ResponseEntity.ok(new CategoryResponse("Категория удалена", ""));
        }catch(Exception e){
            return ResponseEntity.ok(new CategoryResponse("", e.getMessage()));
        }
    }
}
