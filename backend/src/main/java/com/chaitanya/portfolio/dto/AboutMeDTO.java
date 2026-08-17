package com.chaitanya.portfolio.dto;

import com.chaitanya.portfolio.model.AboutMe;

public record AboutMeDTO(
        Long id,
        String fullName,
        String title,
        String bio,
        String dsaSolved,
        String cgpa,
        String collegeName,
        String degreeName,
        String avatarUrl,
        String email,
        String githubUrl,
        String linkedinUrl,
        String leetcodeUrl,
        String codechefUrl
) {
    public static AboutMeDTO from(AboutMe aboutMe) {
        if (aboutMe == null) return null;
        return new AboutMeDTO(
                aboutMe.getId(),
                aboutMe.getFullName(),
                aboutMe.getTitle(),
                aboutMe.getBio(),
                aboutMe.getDsaSolved(),
                aboutMe.getCgpa(),
                aboutMe.getCollegeName(),
                aboutMe.getDegreeName(),
                aboutMe.getAvatarUrl(),
                aboutMe.getEmail(),
                aboutMe.getGithubUrl(),
                aboutMe.getLinkedinUrl(),
                aboutMe.getLeetcodeUrl(),
                aboutMe.getCodechefUrl()
        );
    }
}
