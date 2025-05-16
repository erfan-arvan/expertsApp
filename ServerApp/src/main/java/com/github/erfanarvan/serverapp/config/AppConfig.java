package com.github.erfanarvan.serverapp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppConfig {

    private String frontendUrl;
    private String backendUrl;
    private String productionUrl;

    public void setProductionUrl(String productionUrl) {
        this.productionUrl = productionUrl;
    }

    public String getProductionUrl() {
        return productionUrl;
    }

    public String getFrontendUrl() {
        return frontendUrl;
    }

    public void setFrontendUrl(String frontendUrl) {
        this.frontendUrl = frontendUrl;
    }

    public String getBackendUrl() {
        return backendUrl;
    }

    public void setBackendUrl(String backendUrl) {
        this.backendUrl = backendUrl;
    }

}
