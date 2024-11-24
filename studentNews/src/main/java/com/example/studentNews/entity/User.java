package com.example.studentNews.entity;

import com.example.studentNews.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id")
    public UUID id;
    @Column(name="fio")
    public String fio;
    @Column(name="email", nullable = false)
    public String email;
    @Column(name="password", nullable = false)
    public String password;
    @Column(name="image")
    public byte[] image;
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    public Role role;
    @OneToMany(cascade = CascadeType.DETACH)
    private List<Article> articles;
    @OneToMany(cascade = CascadeType.DETACH)
    private List<Comment> comments;

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
}
