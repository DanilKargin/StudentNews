package com.example.studentNews.repository;

import com.example.studentNews.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository  extends JpaRepository<Category, UUID> {
    Optional<Category> getCategoryByName(String name);
}
