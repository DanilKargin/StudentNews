package com.example.studentNews.repository;

import com.example.studentNews.ArticleStatus;
import com.example.studentNews.entity.Article;
import com.example.studentNews.entity.Category;
import com.example.studentNews.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleRepository extends JpaRepository<Article, UUID> {
    @Query("SELECT a FROM Article a WHERE a.status LIKE(?1) ORDER BY a.create_date desc")
    List<Article> getListByStatus(ArticleStatus status);

    @Query("SELECT a FROM Article a WHERE a.status LIKE(?1) and a.category.name LIKE(?2) ORDER BY a.create_date desc")
    List<Article> getListByCategoryName(ArticleStatus status, String category);
    @Query("SELECT a FROM Article a WHERE a.status LIKE(:status) and TRIM(LOWER(a.name)) LIKE TRIM(LOWER(:name)) ORDER BY a.create_date desc")
    List<Article> getListByName(@Param("status") ArticleStatus status, @Param("name") String name);
    @Query("SELECT a FROM Article a WHERE a.user = :user and a.status LIKE(:status) and TRIM(LOWER(a.name)) LIKE TRIM(LOWER(:name))")
    List<Article> getArticleListByStatusAndUserAndName(@Param("user") User user, @Param("status") ArticleStatus status, @Param("name") String name);
    List<Article> getListByStatusAndUser(ArticleStatus status, User user);
    Optional<Article> getArticleByIdAndStatus(UUID id, ArticleStatus status);
    Optional<Article> getArticleByIdAndStatusAndUser(UUID id, ArticleStatus status, User user);
}
