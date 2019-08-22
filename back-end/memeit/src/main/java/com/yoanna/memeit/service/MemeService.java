package com.yoanna.memeit.service;

import com.yoanna.memeit.model.Meme;

import java.util.List;

public interface MemeService {
    Meme add(Meme meme);
    void update(Long id, Meme meme);
    void delete(Long id);
    List<Meme> getAll();
    Meme get(Long id);
    String closestMatchToTerm(String searchTerm);
}
