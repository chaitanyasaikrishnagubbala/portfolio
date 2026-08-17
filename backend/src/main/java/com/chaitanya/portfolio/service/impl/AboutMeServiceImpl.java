package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.AboutMeDTO;
import com.chaitanya.portfolio.model.AboutMe;
import com.chaitanya.portfolio.repository.AboutMeRepository;
import com.chaitanya.portfolio.service.AboutMeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AboutMeServiceImpl implements AboutMeService {

    private final AboutMeRepository aboutMeRepository;

    public AboutMeServiceImpl(AboutMeRepository aboutMeRepository) {
        this.aboutMeRepository = aboutMeRepository;
    }

    @Override
    public AboutMeDTO getAboutMe() {
        return aboutMeRepository.findFirstByOrderByIdAsc()
                .map(AboutMeDTO::from)
                .orElse(null);
    }

    @Override
    @Transactional
    public AboutMeDTO updateAboutMe(AboutMe details) {
        AboutMe existing = aboutMeRepository.findFirstByOrderByIdAsc().orElseGet(AboutMe::new);

        existing.setFullName(details.getFullName());
        existing.setTitle(details.getTitle());
        existing.setBio(details.getBio());
        existing.setDsaSolved(details.getDsaSolved());
        existing.setCgpa(details.getCgpa());
        existing.setCollegeName(details.getCollegeName());
        existing.setDegreeName(details.getDegreeName());
        existing.setAvatarUrl(details.getAvatarUrl());
        existing.setEmail(details.getEmail());
        existing.setGithubUrl(details.getGithubUrl());
        existing.setLinkedinUrl(details.getLinkedinUrl());
        existing.setLeetcodeUrl(details.getLeetcodeUrl());
        existing.setCodechefUrl(details.getCodechefUrl());

        AboutMe saved = aboutMeRepository.save(existing);
        return AboutMeDTO.from(saved);
    }
}
