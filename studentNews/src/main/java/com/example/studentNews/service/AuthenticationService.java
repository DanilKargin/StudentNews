package com.example.studentNews.service;

import com.example.studentNews.Role;
import com.example.studentNews.controller.domain.*;
import com.example.studentNews.dto.UserDto;
import com.example.studentNews.entity.User;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private static final int TOKEN_VALIDITY_HOURS = 1;

    @Transactional
    public SignUpResponse signUp(SignUpRequest request) {

        try {
            var checkUser = userService.findByEmail(request.getEmail());
            if(checkUser.isPresent() && checkUser.get().getRole() == Role.Not_confirmed){
                userService.deleteUserByUser(checkUser.get());
            }
            var user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.Not_confirmed)
                    .build();
            generateVerificationToken(user);
            userService.create(user);

            var jwt = jwtService.generateToken(user);

            String verificationLink = "http://localhost:8080/auth/verify?token=" + user.getVerificationToken();

            sendVerificationEmail(user);
            return new SignUpResponse("Письмо с подтверждением регистрации отправлена на почту", "");
        }catch (Exception e){
            return new SignUpResponse("",e.getMessage());
        }
    }
    public UserDto edit(byte[] image, String fio, String password){
        var user = userService.getCurrentUser();
        if(!fio.isEmpty()){
            user.setFio(fio);
        }
        if(!password.isEmpty()){
            user.setPassword(passwordEncoder.encode(password));
        }
        if(image != null){
            user.setImage(image);
        }
        return new UserDto(userService.save(user));
    }
    public TokenResponse signIn(SignInRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            ));

            var userDetails = userService.userDetailsService()
                    .loadUserByUsername(request.getEmail());
            var user = (User) userDetails;
            if(user.getRole() == Role.Not_confirmed) {
                throw new RuntimeException("Пользователь не найден");
            }
            var jwt = jwtService.generateToken(userDetails);
            return new TokenResponse(jwt, user.getRole().toString(), "");
        } catch (Exception e) {
            return new TokenResponse("", "", e.getMessage());
        }
    }
    public SignUpResponse regenerateToken(User user){
        try {
            generateVerificationToken(user);
            userService.save(user);
            sendVerificationEmail(user);
            return new SignUpResponse("Письмо с подтверждением регистрации отправлено на почту", "");
        }catch (Exception e){
            return new SignUpResponse("",e.getMessage());
        }
    }

    private void generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        user.setTokenExpiryDate(LocalDateTime.now().plusHours(TOKEN_VALIDITY_HOURS));
    }
    private void sendVerificationEmail(User user) throws MessagingException {
        String verificationLink = "http://localhost:8080/auth/verify?token=" + user.getVerificationToken();

        String htmlContent = buildEmail(verificationLink); // Создаем HTML-контент письма
        emailService.sendHtmlEmail(user.getEmail(), "Подтверждение регистрации", htmlContent);
    }
    private String buildEmail(String verificationLink) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .button {
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                    }
                    .container {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Подтверждение регистрации на сайте StudentNews</h2>
                    <p>Спасибо за регистрацию. Для подтверждения почты нажмите на кнопку ниже:</p>
                    <a href="%s">
                        <button class="button">Подтвердить</button>
                    </a>
                    <p>Если вы не регистрировались на сайте StudentNews, то просто закройте данное сообщение.</p>
                </div>
            </body>
            </html>
            """.formatted(verificationLink);
    }
}
