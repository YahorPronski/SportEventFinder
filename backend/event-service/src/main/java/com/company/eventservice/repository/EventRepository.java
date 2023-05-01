package com.company.eventservice.repository;

import com.company.eventservice.model.Category;
import com.company.eventservice.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    Optional<Event> findByName(String name);

    List<Event> findByCategory(Category category);

    List<Event> findByStartDateTimeAfter(LocalDateTime startDateTime);

    List<Event> findByTicketPrice(Float ticketPrice);

    @Query("SELECT e FROM Event e JOIN e.category c ORDER BY c.name ASC")
    List<Event> findAllOrderByCategoryNameAsc();
}
