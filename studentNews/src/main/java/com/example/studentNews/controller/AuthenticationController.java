package com.example.studentNews.controller;

import com.example.studentNews.Role;
import com.example.studentNews.controller.domain.SignInRequest;
import com.example.studentNews.controller.domain.SignUpRequest;
import com.example.studentNews.controller.domain.SignUpResponse;
import com.example.studentNews.controller.domain.TokenResponse;
import com.example.studentNews.entity.User;
import com.example.studentNews.service.AuthenticationService;
import com.example.studentNews.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<SignUpResponse> signUp(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signUp(request));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<TokenResponse> signIn(@RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signIn(request));

    }
    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        Optional<User> userOpt = userService.verifyEmail(token);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok("Почта успешно подтверждена! Можете вернуться на сайт");
        } else {
            return ResponseEntity.badRequest().body("Неверный или истёкший токен.");
        }
    }
    @PostMapping("/resend-token")
    public ResponseEntity<SignUpResponse> resendToken(@RequestParam("email") String email) {
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getRole() == Role.Not_confirmed) {
            User user = userOpt.get();
            return ResponseEntity.ok(authenticationService.regenerateToken(user));
        }else return ResponseEntity.ok(new SignUpResponse("", "Пользователь не найден или уже подтвержден"));

    }
}
