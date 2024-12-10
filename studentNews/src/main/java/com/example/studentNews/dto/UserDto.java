package com.example.studentNews.dto;

import com.example.studentNews.Role;
import com.example.studentNews.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Data
@Getter
@Setter
public class UserDto {
    public UUID id;
    public String fio;
    public String email;
    public byte[] image;
    public Role role;

    public UserDto(User user){
        this.id = user.getId();
        this.fio = user.getFio();
        this.email = user.getEmail();
        this.image = user.getImage();
        this.role = user.getRole();
    }
}
