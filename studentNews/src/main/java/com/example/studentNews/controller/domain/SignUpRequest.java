package com.example.studentNews.controller.domain;

import lombok.Data;

@Data
public class SignUpRequest {
    private String email;
    private String password;
}
