package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.LoginRequestDTO;
import com.chaitanya.portfolio.dto.LoginResponseDTO;

public interface AuthService {
    LoginResponseDTO login(LoginRequestDTO loginRequest);
}
