package com.matheusjung.shared.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    String upload(String bucket, String path, MultipartFile file);
    void delete(String bucket, String path);
    String getPublicUrl(String bucket, String path);
}