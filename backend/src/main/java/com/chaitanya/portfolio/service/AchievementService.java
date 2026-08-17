package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.AchievementDTO;
import com.chaitanya.portfolio.model.Achievement;

import java.util.List;

public interface AchievementService {
    List<AchievementDTO> getAllAchievements();
    AchievementDTO createAchievement(Achievement achievement);
    AchievementDTO updateAchievement(Long id, Achievement achievement);
    void deleteAchievement(Long id);
}
