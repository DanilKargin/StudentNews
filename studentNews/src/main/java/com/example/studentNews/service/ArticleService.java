package com.example.studentNews.service;

import com.example.studentNews.ArticleStatus;
import com.example.studentNews.controller.domain.ArticleRequest;
import com.example.studentNews.controller.domain.ArticleResponse;
import com.example.studentNews.dto.ArticleDto;
import com.example.studentNews.entity.Article;
import com.example.studentNews.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserService userService;
    private final CategoryService categoryService;

    public Article save(Article article) {
        return articleRepository.save(article);
    }

    public List<ArticleDto> getPublishList() {
        return articleRepository.getListByStatus(ArticleStatus.Posting).stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public List<ArticleDto> getPublishListByName(String name){
        return articleRepository.getListByName(ArticleStatus.Posting, '%'+name+'%').stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public List<ArticleDto> getReadyListByName(String name){
        return articleRepository.getListByName(ArticleStatus.Ready, '%'+name+'%').stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public List<ArticleDto> getPublishListByCategory(String category){
        return articleRepository.getListByCategoryName(ArticleStatus.Posting, '%'+category+'%').stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public List<ArticleDto> getDraftListForReporter() {
        var user = userService.getCurrentUser();
        return articleRepository.getListByStatusAndUser(ArticleStatus.Draft, user).stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public List<ArticleDto> getDraftListForReporterByName(String name) {
        var user = userService.getCurrentUser();
        return articleRepository.getArticleListByStatusAndUserAndName(user, ArticleStatus.Draft, '%'+name+'%').stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public List<ArticleDto> getReadyList(){
        return articleRepository.getListByStatus(ArticleStatus.Ready).stream().map(ArticleDto::new).collect(Collectors.toList());
    }
    public ArticleDto getArticleById(UUID id) {
        var article = articleRepository.getArticleByIdAndStatus(id, ArticleStatus.Posting);
        if (article.isPresent()) {
            return new ArticleDto(article.get());
        } else {
            return null;
        }
    }
    public Article getDraftByIdCheckReporter(UUID id) {
        var user = userService.getCurrentUser();
        var article = articleRepository.getArticleByIdAndStatusAndUser(id, ArticleStatus.Draft, user);
        if (article.isPresent()) {
            return article.get();
        } else {
            return null;
        }
    }
    @Transactional
    public ArticleResponse deleteDraftById(String request){
        var user = userService.getCurrentUser();
        var checkArticle = articleRepository.getArticleByIdAndStatusAndUser(UUID.fromString(request), ArticleStatus.Draft, user);
        if(checkArticle.isPresent()){
            articleRepository.delete(checkArticle.get());
            return new ArticleResponse("Статья удалена", "");
        }else{
            return new ArticleResponse("", "Статья не найдена");
        }
    }
    @Transactional
    public ArticleResponse changeReadyStatusForDraft(UUID id){
        var article = getDraftByIdCheckReporter(id);
        if(article != null){
            article.setStatus(ArticleStatus.Ready);
            save(article);
            return new ArticleResponse("Статья отправлена на проверку", "");
        }
        return new ArticleResponse("", "Статья не найдена");
    }
    public ArticleResponse rejectReadyArticle(ArticleRequest request){
        var article = getArticleReadyById(UUID.fromString(request.getId()));
        if(article != null){
            article.setStatus(ArticleStatus.Draft);
            save(article);
            return new ArticleResponse("Статья отклонена", "");
        }else{
            return new ArticleResponse("", "Статья не найдена");
        }
    }
    public Article getArticleReadyById(UUID id){
        var article = articleRepository.getArticleByIdAndStatus(id, ArticleStatus.Ready);
        if(article.isPresent()){
            return article.get();
        }else return null;
    }
    @Transactional
    public ArticleResponse editReadyDataAndPublish(ArticleRequest request){
        var article = getArticleReadyById(UUID.fromString(request.getId()));
        if(article != null){
            article.setStatus(ArticleStatus.Posting);
            article.setPublish_date(LocalDateTime.now());
            if(!request.getName().isEmpty()){
                article.setName(request.getName());
            }
            if(!request.getCategory().isEmpty()){
                var category = categoryService.getCategoryByName(request.getCategory());
                article.setCategory(category);
            }
            List<Integer> byteList = request.getImage();
            byte[] byteArray = null;
            if(byteList != null) {
                byteArray = new byte[byteList.size()];
                for (int i = 0; i < byteList.size(); i++) {
                    byteArray[i] = byteList.get(i).byteValue();
                }
            }
            if(byteArray != null){
                article.setImage(byteArray);
            }
            if(!request.getContent().isEmpty()){
                article.setContent(request.getContent());
            }
            save(article);
            return new ArticleResponse("Статья отправлена на публикацию", "");
        }
        return new ArticleResponse("", "Статья не найдена");
    }
    @Transactional
    public ArticleResponse createArticle(ArticleRequest request) {
            try {
                var user = userService.getCurrentUser();
                var category = categoryService.getCategoryByName(request.getCategory());
                Article article = null;

                List<Integer> byteList = request.getImage();
                byte[] byteArray = null;
                if(byteList != null) {
                    byteArray = new byte[byteList.size()];
                    for (int i = 0; i < byteList.size(); i++) {
                        byteArray[i] = byteList.get(i).byteValue();
                    }
                }
                if(!request.getId().isEmpty()) {
                    var checkArticle = articleRepository.getArticleByIdAndStatusAndUser(UUID.fromString(request.getId()), ArticleStatus.Draft, user);
                    if (checkArticle.isPresent()) {
                        article = checkArticle.get();
                        article.setCategory(category);
                        if(byteArray != null) {
                            article.setImage(byteArray);
                        }
                        article.setName(request.getName());
                        article.setContent(request.getContent());
                    }
                }else {
                    article = Article.builder()
                            .name(request.getName())
                            .image(byteArray)
                            .create_date(LocalDateTime.now())
                            .user(user)
                            .content(request.getContent())
                            .category(category)
                            .status(ArticleStatus.Draft)
                            .build();
                }
                if (save(article) != null) {
                    return new ArticleResponse("Статья создана/изменена", "");
                } else {
                    return new ArticleResponse("", "Ошибка при создании");
                }
            }catch (Exception e){
                return new ArticleResponse("", e.getMessage());
            }
    }
}
