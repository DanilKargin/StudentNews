package com.example.studentNews.dto;

import com.example.studentNews.entity.Article;
import com.example.studentNews.entity.Comment;
import com.example.studentNews.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Getter
@Setter
public class CommentDto {
    public UUID id;
    public String comment;
    public LocalDateTime create_date;
    private byte[] userImage;
    private String userName;
    private String articleName;

    public CommentDto(Comment comment){
        this.id = comment.getId();
        this.comment = comment.getComment();
        this.userImage = comment.getUser().getImage();
        this.userName = comment.getUser().getFio();
        this.articleName = comment.getArticle().getName();
        this.create_date = comment.getCreate_date();
    }
}
