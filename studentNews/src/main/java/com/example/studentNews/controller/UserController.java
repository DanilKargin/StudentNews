package com.example.studentNews.controller;

import com.example.studentNews.controller.domain.UserRequest;
import com.example.studentNews.dto.UserDto;
import com.example.studentNews.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public UserDto get()
    {
        return new UserDto(userService.getCurrentUser());
    }
}
