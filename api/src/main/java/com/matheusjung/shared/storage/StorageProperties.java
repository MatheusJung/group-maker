package com.matheusjung.shared.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "storage")
public record StorageProperties(
        String url,
        String apiKey
) {
}