package com.company.sporteventservice.service;

import com.company.sporteventservice.model.SportEvent;

import java.util.List;
import java.util.Optional;

public interface SportEventService {
    List<SportEvent> getFilteredSportEvents(Optional<String> country, Optional<String> city,
                                            Optional<Boolean> startsToday, Optional<Boolean> freeEntrance,
                                            Optional<List<String>> sportCategories, String sortBy);

    SportEvent saveSportEvent(SportEvent sportEvent, byte[] sportEventImage);

    SportEvent updateSportEvent(Long id, SportEvent sportEvent, byte[] sportEventImage);

    Optional<SportEvent> getSportEventById(Long id);

    void removeSportEvent(Long id);
}
