package com.example.studentNews.service;

import com.example.studentNews.Role;
import com.example.studentNews.controller.domain.UserRequest;
import com.example.studentNews.dto.UserDto;
import com.example.studentNews.entity.User;
import com.example.studentNews.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }


    public User create(User user) {
        if (userRepository.existsByEmail(user.getUsername())) {
            throw new RuntimeException("Пользователь с таким именем уже существует");
        }
        return save(user);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getByUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));

    }
    public UserDetailsService userDetailsService() {
        return this::getByUsername;
    }

    public User getCurrentUser() {
        var username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getByUsername(username);
    }
    public void deleteUser(){
        var user = getCurrentUser();
        userRepository.delete(user);
    }
    public void deleteUserByUser(User user){
        userRepository.delete(user);
    }
    public Optional<User> verifyEmail(String token) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Проверка на истечение токена
            if (user.getTokenExpiryDate() != null && user.getTokenExpiryDate().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Токен истёк. Пожалуйста, запросите новый.");
            }

            user.setRole(Role.User);
            user.setVerificationToken(null);
            user.setTokenExpiryDate(null);

            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }
}
