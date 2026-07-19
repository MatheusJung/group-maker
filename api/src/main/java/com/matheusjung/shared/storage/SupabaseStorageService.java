package com.matheusjung.shared.storage;

import java.io.IOException;
import java.util.Optional;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;
import com.matheusjung.shared.storage.exception.StorageException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SupabaseStorageService implements StorageService {

    private final RestClient restClient;
    private final StorageProperties properties;

    @Override
    public String upload(String bucket, String path, MultipartFile file) {

        MediaType mediaType = Optional.ofNullable(file.getContentType())
                .map(MediaType::parseMediaType)
                .orElse(MediaType.APPLICATION_OCTET_STREAM);

        try {
            restClient.post()
                    .uri("/storage/v1/object/{bucket}/{path}", bucket, path)
                    .contentType(mediaType)
                    .body(file.getBytes())
                    .retrieve()
                    .toBodilessEntity();

            return path;

        } catch (IOException e) {
            throw new StorageException("Erro ao enviar arquivo.", e);
        }
    }

    @Override
    public void delete(String bucket, String path) {

        restClient.delete()
                .uri("/storage/v1/object/{bucket}/{path}", bucket, path)
                .retrieve()
                .toBodilessEntity();
    }

    @Override
    public String getPublicUrl(String bucket, String path) {

        return properties.url()
                + "/storage/v1/object/public/"
                + bucket
                + "/"
                + path;
    }

}