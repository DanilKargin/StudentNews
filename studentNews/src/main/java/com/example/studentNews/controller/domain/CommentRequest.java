package com.example.studentNews.controller.domain;

import lombok.Data;

@Data
public class CommentRequest {
    private String comment;
    private String article_id;
}
