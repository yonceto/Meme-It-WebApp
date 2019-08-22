package com.yoanna.memeit.repository;

import com.yoanna.memeit.model.Meme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemeRepository extends JpaRepository<Meme, Long> {

}
