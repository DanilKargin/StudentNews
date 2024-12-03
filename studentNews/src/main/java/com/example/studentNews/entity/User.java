package com.example.studentNews.entity;

import com.example.studentNews.Role;
import com.example.studentNews.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static jakarta.persistence.GenerationType.IDENTITY;


@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    @Column(name="fio")
    private String fio;
    @Column(name="image")
    private byte[] image;
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "verification_token",unique = true)
    private String verificationToken;
    @Column(name ="token_date")
    private LocalDateTime tokenExpiryDate;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
    public User(UserDto user){
        this.id = user.getId();
        this.fio = user.getFio();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.image = user.getImage();
        this.role = user.getRole();
    }
}
