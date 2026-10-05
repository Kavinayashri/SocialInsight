package com.example.demo.repository;

import com.example.demo.model.Mention;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MentionRepository extends MongoRepository<Mention, String> {

    List<Mention> findByKeywordIgnoreCase(String keyword);

    List<Mention> findByPlatformIgnoreCase(String platform);
}