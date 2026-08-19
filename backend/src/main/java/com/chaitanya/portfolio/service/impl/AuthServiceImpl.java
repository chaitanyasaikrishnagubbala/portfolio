package com.chaitanya.portfolio.service.impl;

import com.chaitanya.portfolio.dto.LoginRequestDTO;
import com.chaitanya.portfolio.dto.LoginResponseDTO;
import com.chaitanya.portfolio.model.AdminUser;
import com.chaitanya.portfolio.repository.AdminUserRepository;
import com.chaitanya.portfolio.security.JwtUtils;
import com.chaitanya.portfolio.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Value("${portfolio.admin.username}")
    private String envAdminUsername;

    @Value("${portfolio.admin.password}")
    private String envAdminPassword;

    public AuthServiceImpl(AdminUserRepository adminUserRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtils jwtUtils) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {
        String username = request.username();
        String password = request.password();

        Optional<AdminUser> dbUserOpt = adminUserRepository.findByUsername(username);

        boolean isAuthenticated = false;

        if (dbUserOpt.isPresent()) {
            AdminUser user = dbUserOpt.get();
            isAuthenticated = passwordEncoder.matches(password, user.getPassword());
            if (!isAuthenticated) {
                // Self-heal DB password if match fails but credentials match configured env or default admin credentials
                if ((username.equalsIgnoreCase(envAdminUsername) || "chaitanya4123".equals(username)) &&
                    (password.equals(envAdminPassword) || "chaitanya@@gubb".equals(password))) {
                    isAuthenticated = true;
                    user.setPassword(passwordEncoder.encode(password));
                    adminUserRepository.save(user);
                }
            }
        } else {
            // Fallback check against configured environment credentials or default admin credentials
            if ((username.equalsIgnoreCase(envAdminUsername) || "chaitanya4123".equals(username)) &&
                (password.equals(envAdminPassword) || "chaitanya@@gubb".equals(password))) {
                isAuthenticated = true;
                // Auto-provision BCrypt hashed user in DB for future logins
                AdminUser newUser = new AdminUser();
                newUser.setUsername(username);
                newUser.setPassword(passwordEncoder.encode(password));
                newUser.setRole("ROLE_ADMIN");
                adminUserRepository.save(newUser);
            }
        }

        if (!isAuthenticated) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtUtils.generateToken(username);
        return LoginResponseDTO.of(token, username, "ROLE_ADMIN");
    }
}
