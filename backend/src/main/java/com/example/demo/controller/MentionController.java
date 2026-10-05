package com.example.demo.controller;

import com.example.demo.model.Mention;
import com.example.demo.service.MentionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mentions")
@CrossOrigin(origins = "http://localhost:5173")
public class MentionController {

    private final MentionService mentionService;

    public MentionController(MentionService mentionService) {
        this.mentionService = mentionService;
    }

    @GetMapping
    public List<Mention> getAllMentions() {
        return mentionService.getAllMentions();
    }

    @GetMapping("/search")
    public List<Mention> getMentionsByKeyword(@RequestParam String keyword) {
        return mentionService.getMentionsByKeyword(keyword);
    }

    @GetMapping("/platform")
    public List<Mention> getMentionsByPlatform(@RequestParam String platform) {
        return mentionService.getMentionsByPlatform(platform);
    }

    @PostMapping
    public Mention saveMention(@RequestBody Mention mention) {
        return mentionService.saveMention(mention);
    }
}