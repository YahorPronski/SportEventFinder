package com.company.eventservice.service.impl;

import com.company.eventservice.model.Category;
import com.company.eventservice.model.Event;
import com.company.eventservice.model.Location;
import com.company.eventservice.repository.CategoryRepository;
import com.company.eventservice.repository.EventRepository;
import com.company.eventservice.repository.LocationRepository;
import com.company.eventservice.service.EventService;
import com.company.eventservice.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;
    private final LocationRepository locationRepository;
    private final FileUtil fileUtil;

    @Override
    public List<Event> getFilteredEvents(Optional<String> country, Optional<String> city,
                                         Optional<Boolean> startsToday, Optional<Boolean> freeEntrance,
                                         Optional<List<String>> categories, String sortBy) {
        List<Event> events = eventRepository.findAll(Sort.by(Sort.Direction.ASC, sortBy));

        return events.stream()
                .filter(event -> !country.isPresent() || event.getLocation().getCountry().equalsIgnoreCase(country.get()))
                .filter(event -> !city.isPresent() || event.getLocation().getCity().equalsIgnoreCase(city.get()))
                .filter(event -> !categories.isPresent() || categories.get().contains(event.getCategory().getName()))
                .filter(event -> !freeEntrance.isPresent() || (event.getTicketPrice() == null || event.getTicketPrice() == 0.0f))
                .filter(event -> !startsToday.isPresent() || event.getStartDateTime().toLocalDate().equals(LocalDate.now()))
                .collect(Collectors.toList());
    }

    @Override
    public Event saveEvent(Event event, byte[] eventImage) {
        Optional<Category> existingCategory = categoryRepository.findByName(event.getCategory().getName());
        if (existingCategory.isPresent()) {
            event.setCategory(existingCategory.get());
        } else {
            categoryRepository.save(event.getCategory());
        }

        Optional<Location> existingLocation = locationRepository.findByCountryAndCityAndAddress(
                event.getLocation().getCountry(),
                event.getLocation().getCity(),
                event.getLocation().getAddress()
        );
        if (existingLocation.isPresent()) {
            event.setLocation(existingLocation.get());
        } else {
            locationRepository.save(event.getLocation());
        }

        Event savedEvent = eventRepository.save(event);
        if (eventImage != null && eventImage.length > 0) {
            fileUtil.saveFile(savedEvent.getId().toString(), "image", eventImage);
        }
        return savedEvent;
    }

    @Override
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    @Override
    public void removeEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
