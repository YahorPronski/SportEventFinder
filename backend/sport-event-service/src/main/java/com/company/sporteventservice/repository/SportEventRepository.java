package com.company.sporteventservice.repository;

import com.company.sporteventservice.model.SportCategory;
import com.company.sporteventservice.model.SportEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SportEventRepository extends JpaRepository<SportEvent, Long> {
    Optional<SportEvent> findByName(String name);

    List<SportEvent> findBySportCategory(SportCategory sportCategory);

    List<SportEvent> findByStartDateTimeAfter(LocalDateTime startDateTime);

    List<SportEvent> findByTicketPrice(Float ticketPrice);
}
