package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.AboutMeDTO;
import com.chaitanya.portfolio.model.AboutMe;

public interface AboutMeService {
    AboutMeDTO getAboutMe();
    AboutMeDTO updateAboutMe(AboutMe aboutMe);
}
