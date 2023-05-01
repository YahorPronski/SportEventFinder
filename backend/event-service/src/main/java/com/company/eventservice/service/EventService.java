package com.company.eventservice.service;

import com.company.eventservice.model.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getFilteredEvents(Optional<String> country, Optional<String> city,
                                  Optional<Boolean> startsToday, Optional<Boolean> freeEntrance,
                                  Optional<List<String>> categories, String sortBy);

    Event saveEvent(Event event, byte[] eventImage);

    Optional<Event> getEventById(Long eventId);

    byte[] getEventImage(Long eventId);

    void removeEvent(Long id);
}
