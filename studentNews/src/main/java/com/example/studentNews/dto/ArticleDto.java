package com.example.studentNews.dto;

import com.example.studentNews.ArticleStatus;
import com.example.studentNews.entity.Article;
import com.example.studentNews.entity.Category;
import com.example.studentNews.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

import static jakarta.persistence.GenerationType.IDENTITY;

@Data
@Getter
@Setter
public class ArticleDto {
    public String id;
    public String name;
    public byte[] image;
    public String content;
    public ArticleStatus status;
    public LocalDateTime create_date;
    public LocalDateTime publish_date;
    public String userName;
    public byte[] userImage;
    public String category;

    public ArticleDto(Article article){
        this.id = article.getId().toString();
        this.name = article.getName();
        this.image = article.getImage();
        this.content = article.getContent();
        this.create_date = article.getCreate_date();
        this.publish_date = article.getPublish_date();
        this.userName = article.getUser().getFio();
        this.userImage = article.getUser().getImage();
        this.category = article.getCategory().getName();
        this.status = article.getStatus();
    }
}
