package com.example.studentNews.controller;

import com.example.studentNews.controller.domain.ArticleRequest;
import com.example.studentNews.controller.domain.ArticleResponse;
import com.example.studentNews.dto.ArticleDto;
import com.example.studentNews.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    @GetMapping("/publications")
    public ResponseEntity<List<ArticleDto>> getPublishList(){
        return ResponseEntity.ok(articleService.getPublishList());
    }
    @GetMapping("/publications/name")
    public ResponseEntity<List<ArticleDto>> getPublishListByName(@RequestParam("s") String s){
        return ResponseEntity.ok(articleService.getPublishListByName(s));
    }
    @GetMapping("/publications/category")
    public ResponseEntity<List<ArticleDto>> getPublishListByCategory(@RequestParam("s") String s){
        return ResponseEntity.ok(articleService.getPublishListByCategory(s));
    }
    @GetMapping("/publication")
    public ResponseEntity<ArticleDto> getPublishById(@RequestParam("id") UUID id){
        return ResponseEntity.ok(new ArticleDto(articleService.getArticleById(id)));
    }
    @GetMapping("/reporter/drafts")
    public ResponseEntity<List<ArticleDto>> getReporterDraftList(){
        return ResponseEntity.ok(articleService.getDraftListForReporter());
    }
    @GetMapping("/reporter/drafts/search")
    public ResponseEntity<List<ArticleDto>> getSearchReporterDraftList(@RequestParam("s") String s){
        return ResponseEntity.ok(articleService.getDraftListForReporterByName(s));
    }
    @GetMapping("/reporter/draft")
    public ResponseEntity<ArticleDto> getDraftById(@RequestParam("id") String id) {
        return ResponseEntity.ok(new ArticleDto(articleService.getDraftByIdCheckReporter(UUID.fromString(id))));
    }
    @GetMapping("/ready")
    public ResponseEntity<List<ArticleDto>> getReadyList(){
        return ResponseEntity.ok(articleService.getReadyList());
    }
    @GetMapping("/ready/search")
    public ResponseEntity<List<ArticleDto>> getSearchReadyList(@RequestParam("s") String s){
        return ResponseEntity.ok(articleService.getReadyListByName(s));
    }
    @GetMapping("/ready-get")
    public ResponseEntity<ArticleDto> getReadyById(@RequestParam("id") String id){
        return ResponseEntity.ok(new ArticleDto(articleService.getArticleReadyById(UUID.fromString(id))));
    }
    @PutMapping("/ready/save-publish")
    public ResponseEntity<ArticleResponse> changeToPublicationStatus(@RequestBody ArticleRequest request){
        return ResponseEntity.ok(articleService.editReadyDataAndPublish(request));
    }
    @PutMapping("/ready/reject")
    public ResponseEntity<ArticleResponse> rejectReadyArticle(@RequestBody ArticleRequest request){
        return ResponseEntity.ok(articleService.rejectReadyArticle(request));
    }
    @DeleteMapping("/reporter/draft")
    public ResponseEntity<ArticleResponse> deleteArticle(@RequestParam("id") String id){
        return ResponseEntity.ok(articleService.deleteDraftById(id));
    }
    @PutMapping("/reporter/draft/change-ready")
    public ResponseEntity<ArticleResponse> changeStatusArticle(@RequestParam("id") String id){
        return ResponseEntity.ok(articleService.changeReadyStatusForDraft(UUID.fromString(id)));
    }

    @PostMapping("/draft/save")
    public ResponseEntity<ArticleResponse> saveArticle(@RequestBody ArticleRequest request){
        return ResponseEntity.ok(articleService.createArticle(request));
    }
}
