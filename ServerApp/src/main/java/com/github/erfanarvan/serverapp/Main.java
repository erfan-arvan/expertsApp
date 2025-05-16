package com.github.erfanarvan.serverapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.github.erfanarvan.serverapp.config.AppConfig;


@SpringBootApplication
@EnableConfigurationProperties(AppConfig.class)
public class Main implements org.springframework.boot.CommandLineRunner {

    private final AppConfig appConfig;

    public Main(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) {
        // Debugging puroses
        System.out.println("Frontend URL from AppConfig: " + appConfig.getFrontendUrl());
        System.out.println("Backend URL from AppConfig: " + appConfig.getBackendUrl());
        System.out.println("Production URL from AppConfig: " + appConfig.getProductionUrl());
    }

}
