package com.matheusjung.shared.storage;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import com.matheusjung.shared.storage.validator.ImageValidator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageStorageService {

    private final StorageService storageService;
    private final ImageValidator imageValidator;

    public String upload(
            String bucket,
            String folder,
            UUID id,
            MultipartFile file
    ) {
        imageValidator.validate(file);

        String extensao = StringUtils
                .getFilenameExtension(
                        file.getOriginalFilename()
                );

        if (extensao == null || extensao.isBlank()) {
            extensao = "jpg";
        }

        String path = folder
                + '/'
                + id
                + "/foto."
                + extensao.toLowerCase();

        storageService.upload(
                bucket,
                path,
                file
        );

        return storageService.getPublicUrl(
                bucket,
                path
        );
    }

    public void delete(
        String bucket,
        String folder,
        UUID id,
        String fotoUrl
    ) {

        if (fotoUrl == null || fotoUrl.isBlank()) {
            return;
        }

        String extensao = StringUtils
                .getFilenameExtension(fotoUrl);

        String path = folder
                + '/'
                + id
                + "/foto."
                + extensao;

        storageService.delete(
                bucket,
                path
        );
    }
}