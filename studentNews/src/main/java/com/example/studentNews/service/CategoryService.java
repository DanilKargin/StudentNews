package com.example.studentNews.service;

import com.example.studentNews.entity.Category;
import com.example.studentNews.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public Category getCategoryByName(String name){
        return categoryRepository.getCategoryByName(name)
                .orElseThrow(() -> new NotFoundException("Такой категории не существует"));
    }
    public Category create(String name){
        var category = Category.builder()
                .name(name).build();
        return categoryRepository.save(category);
    }
    public void delete(String name){
        var category = getCategoryByName(name);
        categoryRepository.delete(category);
    }
    public List<Category> getFullList(){
        return categoryRepository.findAll();
    }

}
