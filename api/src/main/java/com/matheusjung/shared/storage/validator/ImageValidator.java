package com.matheusjung.shared.storage.validator;

import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import com.matheusjung.shared.storage.exception.StorageException;

@Component
public class ImageValidator {

    private static final List<String> ALLOWED_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    private static final long MAX_SIZE = 2L * 1024 * 1024;

    public void validate(MultipartFile file) {
        validateType(file);
        validateSize(file);
    }

    private void validateType(MultipartFile file) {
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new StorageException(
                    "Formato de imagem não permitido."
            );
        }
    }

    private void validateSize(MultipartFile file) {
        if (file.getSize() > MAX_SIZE) {
            throw new StorageException(
                    "Imagem excede o tamanho máximo de 2MB."
            );
        }
    }
}