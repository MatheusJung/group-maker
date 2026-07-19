package com.matheusjung.shared.storage;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(StorageProperties.class)
public class StorageConfig {

    @Bean
    RestClient restClient(StorageProperties properties) {

        return RestClient.builder()
                .baseUrl(properties.url())
                .defaultHeader("Authorization", "Bearer " + properties.apiKey())
                .defaultHeader("apikey", properties.apiKey())
                .build();
    }

}