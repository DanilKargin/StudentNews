package com.example.studentNews.controller;

import com.example.studentNews.controller.domain.UserRequest;
import com.example.studentNews.dto.UserDto;
import com.example.studentNews.entity.User;
import com.example.studentNews.service.AuthenticationService;
import com.example.studentNews.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService authenticationService;
    @GetMapping
    public UserDto get()
    {
        return new UserDto(userService.getCurrentUser());
    }
    @PostMapping("/edit")
    public UserDto edit(@RequestBody UserRequest request){
        byte[] byteArray;
        if(request.getImage() != null) {
            List<Integer> byteList = request.getImage();
            byteArray = new byte[byteList.size()];
            for (int i = 0; i < byteList.size(); i++) {
                byteArray[i] = byteList.get(i).byteValue();
            }
        }else{
            byteArray = null;
        }
        return authenticationService.edit(byteArray, request.getFio(), request.getPassword());
    }
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(){
        userService.deleteUser();
        return ResponseEntity.ok("Профиль удален");
    }
}
