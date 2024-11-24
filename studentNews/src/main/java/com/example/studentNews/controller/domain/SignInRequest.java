package com.example.studentNews.controller.domain;

import lombok.Data;

@Data
public class SignInRequest {
    private String email;
    private String password;
}
