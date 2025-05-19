package com.github.erfanarvan.serverapp.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final AppConfig appConfig;

    public WebConfig(AppConfig appConfig) {
        this.appConfig = appConfig;
        System.out.println("Frontend URL from AppConfig: " + appConfig.getFrontendUrl());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        
        registry.addMapping("/get_snippet_order")
                .allowedOrigins(
                appConfig.getFrontendUrl(),
                appConfig.getBackendUrl(),
                appConfig.getProductionUrl()
            )
            .allowedMethods("POST");

        registry.addMapping("/submit_final")
                .allowedOrigins(
                appConfig.getFrontendUrl(),
                appConfig.getBackendUrl(),
                appConfig.getProductionUrl()
            )
            .allowedMethods("POST");
    }
}
