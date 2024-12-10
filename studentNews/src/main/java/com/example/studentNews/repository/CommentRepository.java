package com.example.studentNews.repository;

import com.example.studentNews.entity.Article;
import com.example.studentNews.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> getCommentListByArticle(Article article);
}
