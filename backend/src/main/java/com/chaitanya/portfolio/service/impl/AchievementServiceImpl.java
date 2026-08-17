package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.AchievementDTO;
import com.chaitanya.portfolio.exception.ResourceNotFoundException;
import com.chaitanya.portfolio.model.Achievement;
import com.chaitanya.portfolio.repository.AchievementRepository;
import com.chaitanya.portfolio.service.AchievementService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AchievementServiceImpl implements AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementServiceImpl(AchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    @Override
    public List<AchievementDTO> getAllAchievements() {
        return achievementRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(AchievementDTO::from)
                .toList();
    }

    @Override
    @Transactional
    public AchievementDTO createAchievement(Achievement achievement) {
        Achievement saved = achievementRepository.save(achievement);
        return AchievementDTO.from(saved);
    }

    @Override
    @Transactional
    public AchievementDTO updateAchievement(Long id, Achievement details) {
        Achievement existing = achievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Achievement not found with id: " + id));

        existing.setTitle(details.getTitle());
        existing.setCategory(details.getCategory());
        existing.setDescription(details.getDescription());
        existing.setYear(details.getYear());
        existing.setHighlights(details.getHighlights());
        existing.setColor(details.getColor());
        if (details.getSortOrder() != null) {
            existing.setSortOrder(details.getSortOrder());
        }

        Achievement updated = achievementRepository.save(existing);
        return AchievementDTO.from(updated);
    }

    @Override
    @Transactional
    public void deleteAchievement(Long id) {
        if (!achievementRepository.existsById(id)) {
            throw new ResourceNotFoundException("Achievement not found with id: " + id);
        }
        achievementRepository.deleteById(id);
    }
}
