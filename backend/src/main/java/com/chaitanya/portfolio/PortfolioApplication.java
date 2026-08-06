package com.chaitanya.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("=================================================");
        System.out.println("🚀 Gubbala Chaitanya Sai Krishna Portfolio Backend");
        System.out.println("   Spring Boot REST API running on port 8080");
        System.out.println("=================================================");
    }
}
