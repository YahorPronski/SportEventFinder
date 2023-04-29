package com.company.sporteventservice.repository;

import com.company.sporteventservice.model.SportCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportCategoryRepository extends JpaRepository<SportCategory, Long> {
}
