package com.yoanna.memeit.controller;

import com.yoanna.memeit.model.Meme;
import com.yoanna.memeit.service.MemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "meme")
public class MemeController {
    @Autowired
    private MemeService memeService;

    @PostMapping
    public Meme add(@RequestBody Meme meme) {
       return memeService.add(meme);
    }

    @GetMapping
    public List<Meme> getAll() {
        return memeService.getAll();
    }

    @GetMapping("/{id}")
    public Meme getMeme(@PathVariable Long id) {
        return memeService.get(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.memeService.delete(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody Meme meme) {
        memeService.update(id, meme);
    }

    @GetMapping("/search/{term}")
    public String closestString(@PathVariable String term) {
        return memeService.closestMatchToTerm(term);
    }
}

