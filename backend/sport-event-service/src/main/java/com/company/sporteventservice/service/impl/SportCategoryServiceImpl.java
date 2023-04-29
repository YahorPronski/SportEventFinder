package com.company.sporteventservice.service.impl;

import com.company.sporteventservice.model.SportCategory;
import com.company.sporteventservice.repository.SportCategoryRepository;
import com.company.sporteventservice.service.SportCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SportCategoryServiceImpl implements SportCategoryService {

    private final SportCategoryRepository sportCategoryRepository;

    @Override
    public List<SportCategory> getSportCategories() {
        return sportCategoryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

}
