package com.example.demo.service;

import com.example.demo.model.Mention;
import com.example.demo.repository.MentionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MentionService {

    private final MentionRepository mentionRepository;

    public MentionService(MentionRepository mentionRepository) {
        this.mentionRepository = mentionRepository;
    }

    public List<Mention> getAllMentions() {
        return mentionRepository.findAll();
    }

    public List<Mention> getMentionsByKeyword(String keyword) {
        return mentionRepository.findByKeywordIgnoreCase(keyword);
    }

    public List<Mention> getMentionsByPlatform(String platform) {
        return mentionRepository.findByPlatformIgnoreCase(platform);
    }

    public Mention saveMention(Mention mention) {
        return mentionRepository.save(mention);
    }
}