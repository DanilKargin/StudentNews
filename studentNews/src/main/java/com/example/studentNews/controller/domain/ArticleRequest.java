package com.example.studentNews.controller.domain;

import com.example.studentNews.entity.Category;
import lombok.Data;

import java.util.List;

@Data
public class ArticleRequest {
    private String id;
    private List<Integer> image;
    private String name;
    private String category;
    private String content;
}
