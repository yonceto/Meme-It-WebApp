package com.yoanna.memeit.storage;

import com.yoanna.memeit.Constants;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import static com.yoanna.memeit.Constants.STATIC_IMAGES_LOCATION;

@Service
public class FileSystemStorageService implements StorageService {
    private final Path rootLocation;

    public FileSystemStorageService() {
        this.rootLocation = Paths.get(STATIC_IMAGES_LOCATION);
        try {
            Files.createDirectories(this.rootLocation);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String store(MultipartFile file) {
        String name = generateUUIDFileName(file);
        try {
            Files.copy(file.getInputStream(), this.rootLocation.resolve(name));
        } catch (Exception e) {
            throw new RuntimeException("FAIL!", e);
        }
        return Constants.IMAGE_PATH + name;
    }

    public String generateUUIDFileName(MultipartFile file) {
        String name = file.getOriginalFilename();
        String extension = name.substring(name.lastIndexOf("."));
        String newName = UUID.randomUUID().toString() + extension;
        return newName;
    }

    public Resource loadFile(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }
}
