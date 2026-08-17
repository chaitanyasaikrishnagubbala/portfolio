package com.chaitanya.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.chaitanya.portfolio.model")
@EnableJpaRepositories(basePackages = "com.chaitanya.portfolio.repository")
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("=================================================");
        System.out.println("🚀 Gubbala Chaitanya Sai Krishna Portfolio Backend");
        System.out.println("   Spring Boot REST API running on port 8081");
        System.out.println("=================================================");
    }
}
