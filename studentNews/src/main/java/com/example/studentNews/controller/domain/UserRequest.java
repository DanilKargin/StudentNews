package com.example.studentNews.controller.domain;

import lombok.Data;

import java.util.List;

@Data
public class UserRequest {
    private List<Integer> image;
    private String fio;
    private String password;
}
