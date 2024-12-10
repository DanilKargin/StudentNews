package com.example.studentNews.controller;

import com.example.studentNews.controller.domain.CommentRequest;
import com.example.studentNews.controller.domain.CommentResponse;
import com.example.studentNews.dto.CommentDto;
import com.example.studentNews.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/list")
    public ResponseEntity<List<CommentDto>> getCommentListByArticle(@RequestParam("id") String id){
        return ResponseEntity.ok(commentService.getFullListByArticleId(id));
    }

    @PostMapping("/create")
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest request){
        return ResponseEntity.ok(commentService.createComment(request));
    }

}
