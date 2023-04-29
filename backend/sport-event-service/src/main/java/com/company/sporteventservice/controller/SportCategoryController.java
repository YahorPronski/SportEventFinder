package com.company.sporteventservice.controller;

import com.company.sporteventservice.model.SportCategory;
import com.company.sporteventservice.service.SportCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/sport-categories")
@RequiredArgsConstructor
public class SportCategoryController {

    private final SportCategoryService sportCategoryService;

    @GetMapping
    public List<SportCategory> getSportCategories() {
        return sportCategoryService.getSportCategories();
    }

}
