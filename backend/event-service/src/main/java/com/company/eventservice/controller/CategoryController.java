package com.company.eventservice.controller;

import com.company.eventservice.model.Category;
import com.company.eventservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final ModelMapper modelMapper;

    @GetMapping
    public List<String> getCategories() {
        return categoryService.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toList());
    }

}
