package com.yoanna.memeit.service;


import com.yoanna.memeit.model.Meme;
import com.yoanna.memeit.repository.MemeRepository;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@Service
public class MemeServiceImpl implements MemeService {
    @Autowired
    private MemeRepository memeRepository;

    @Override
    public Meme add(Meme meme) {
        return memeRepository.save(meme);
    }

    @Override
    public void update(Long id, Meme meme) {
        Optional<Meme> memeOptional = memeRepository.findById(id);
        if(memeOptional.isPresent()) {
            meme.setId(id);
            memeRepository.save(meme);
        }
    }

    @Override
    public void delete(Long id) {
        if(memeRepository.findById(id).isPresent()) {
            memeRepository.deleteById(id);
        }
    }

    @Override
    public List<Meme> getAll() {
        return memeRepository.findAll();
    }

    @Override
    public Meme get(Long id) {
        return memeRepository.findById(id).orElse(null);
    }

    @Override
    public String closestMatchToTerm(String searchTerm) {
        int minDistance = Integer.MAX_VALUE;
        searchTerm = searchTerm.toLowerCase();
        String closestMatch = "";
        List<Meme> memes = memeRepository.findAll();
        List<String> words = new ArrayList<>();
        for (Meme m : memes) {
            words.addAll(Arrays.asList(m.getTitle().toLowerCase().split(" |\\.|\\-|\\?|\\!|\\,|\\:")));
        }
        for(String w : words) {
            LevenshteinDistance levenshteinDistance = new LevenshteinDistance();
            int distance = levenshteinDistance.apply(w, searchTerm);
            if(distance < minDistance) {
                minDistance = distance;
                closestMatch = w;
            }
        }
        return closestMatch;
    }
}
