package com.yoanna.memeit.service;

import com.yoanna.memeit.model.Meme;
import com.yoanna.memeit.repository.MemeRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {MemeServiceImpl.class})
public class MemeServiceImplTest {
    static final String MEME_TITLE_CONTAINING_FRIDAY = "Friday - be like";
    static final String MEME_TITLE_NOT_CONTAINING_FRIDAY = "Haters gonna hate";
    static final String SEARCH_TERM = "FRIyay";
    static final String EXPECTED_CLOSEST_STRING = "friday";

    @InjectMocks
    @Autowired
    private MemeServiceImpl memeService;

    @MockBean
    private MemeRepository mockMemeRepository;
    private List<Meme> mockMemes;
    private Meme mockMeme;
    private Meme mockMeme2;


    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        mockMeme = new Meme();
        mockMeme2 = new Meme();
        mockMemes = new ArrayList<>();
        mockMeme.setTitle(MEME_TITLE_CONTAINING_FRIDAY);
        mockMemes.add(mockMeme);
        mockMeme2.setTitle(MEME_TITLE_NOT_CONTAINING_FRIDAY);
        mockMemes.add(mockMeme2);
        Mockito.when(mockMemeRepository.findAll()).thenReturn(mockMemes);

    }

    @Test
    public void closestMatchToTermTest() {
        assertEquals(EXPECTED_CLOSEST_STRING, memeService.closestMatchToTerm(SEARCH_TERM));
    }
}