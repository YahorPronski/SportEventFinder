package com.company.eventservice.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.Base64;

@Slf4j
@Component
public class FileUtil {

    @Value("${files.events.path}")
    private String uploadRootPath;

    public void saveFile(String directory, String fileName, byte[] file) {
        Path uploadPath = Paths.get(uploadRootPath, directory);

        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                log.error("Could not create directory {}", uploadPath.toAbsolutePath(), e);
            }
        }

        Path filePath = uploadPath.resolve(fileName);
        try (InputStream inputStream = new ByteArrayInputStream(file)) {
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Could not save file {}", filePath.toAbsolutePath(), e);
        }
    }

    public byte[] readFile(String directory, String fileName) {
        Path absPath = Paths.get(uploadRootPath, directory, fileName);
        try {
            return Files.readAllBytes(absPath);
        } catch (NoSuchFileException e) {
            log.info("File not found: {}", absPath);
        } catch (IOException e) {
            log.error("Could not read file {}", absPath, e);
        }
        return null;
    }

    public String encodeBase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }

    public byte[] decodeBase64(String fileBase64) {
        return Base64.getDecoder().decode(fileBase64);
    }

}
