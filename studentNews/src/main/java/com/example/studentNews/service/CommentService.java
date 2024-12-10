package com.example.studentNews.service;

import com.example.studentNews.controller.domain.CommentRequest;
import com.example.studentNews.controller.domain.CommentResponse;
import com.example.studentNews.dto.CommentDto;
import com.example.studentNews.entity.Comment;
import com.example.studentNews.repository.ArticleRepository;
import com.example.studentNews.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final ArticleService articleService;

    private Comment save(Comment comment){
        return commentRepository.save(comment);
    }
    public CommentResponse createComment(CommentRequest request){
        try {
            var user = userService.getCurrentUser();
            var article = articleService.getArticleById(UUID.fromString(request.getArticle_id()));
            var comment = Comment.builder()
                    .comment(request.getComment())
                    .create_date(LocalDateTime.now())
                    .user(user)
                    .article(article)
                    .build();
            save(comment);
            return new CommentResponse("Комментарий создан", "");
        }catch (Exception e){
            return new CommentResponse("", e.getMessage());
        }
    }
    public List<CommentDto> getFullListByArticleId(String id){
        var article = articleService.getArticleById(UUID.fromString(id));
        return commentRepository.getCommentListByArticle(article).stream().map(CommentDto::new).collect(Collectors.toList());
    }

}
