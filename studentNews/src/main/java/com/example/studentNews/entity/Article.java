package com.example.studentNews.entity;

import com.example.studentNews.ArticleStatus;
import com.example.studentNews.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name="articles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Article {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id")
    public UUID id;
    @Column(name = "name", nullable = false)
    public String name;
    @Column(name = "image", nullable = false)
    public byte[] image;
    @Column(name = "article_content", nullable = false)
    public String content;
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    public ArticleStatus status;
    @Column(name = "create_date", nullable = false)
    public LocalDateTime create_date;
    @Column(name = "publish_date")
    public LocalDateTime publish_date;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    public Category category;
    @OneToMany(cascade = CascadeType.DETACH)
    private List<Comment> comments;
}
