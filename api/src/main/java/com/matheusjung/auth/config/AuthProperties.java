package com.matheusjung.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "auth")
public class AuthProperties {

    private String jwtSecret;
    private Long jwtExpirationMinutes;
    private Long refreshExpirationDays;

    public String getJwtSecret() { return jwtSecret; }
    public void setJwtSecret(String jwtSecret) { this.jwtSecret = jwtSecret; }

    public Long getJwtExpirationMinutes() { return jwtExpirationMinutes; }
    public void setJwtExpirationMinutes(Long jwtExpirationMinutes) { this.jwtExpirationMinutes = jwtExpirationMinutes; }

    public Long getRefreshExpirationDays() { return refreshExpirationDays; }
    public void setRefreshExpirationDays(Long refreshExpirationDays) { this.refreshExpirationDays = refreshExpirationDays; }
}
