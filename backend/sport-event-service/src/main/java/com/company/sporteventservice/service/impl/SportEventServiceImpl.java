package com.company.sporteventservice.service.impl;

import com.company.sporteventservice.model.SportEvent;
import com.company.sporteventservice.repository.SportEventRepository;
import com.company.sporteventservice.service.SportEventService;
import com.company.sporteventservice.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SportEventServiceImpl implements SportEventService {

    private final SportEventRepository sportEventRepository;
    private final FileUtil fileUtil;

    @Override
    public List<SportEvent> getFilteredSportEvents(Optional<String> country, Optional<String> city,
                                                   Optional<Boolean> startsToday, Optional<Boolean> freeEntrance,
                                                   Optional<List<String>> sportCategories, String sortBy) {
        List<SportEvent> sportEvents = sportEventRepository.findAll(Sort.by(Sort.Direction.ASC, sortBy));

        return sportEvents.stream()
                .filter(event -> !country.isPresent() || event.getLocation().getCountry().equalsIgnoreCase(country.get()))
                .filter(event -> !city.isPresent() || event.getLocation().getCity().equalsIgnoreCase(city.get()))
                .filter(event -> !sportCategories.isPresent() || sportCategories.get().contains(event.getSportCategory().getName()))
                .filter(event -> !freeEntrance.isPresent() || (event.getTicketPrice() == null || event.getTicketPrice() == 0.0f))
                .filter(event -> !startsToday.isPresent() || event.getStartDateTime().toLocalDate().equals(LocalDate.now()))
                .collect(Collectors.toList());
    }

    @Override
    public SportEvent saveSportEvent(SportEvent sportEvent, byte[] sportEventImage) {
        SportEvent savedSportEvent = sportEventRepository.save(sportEvent);
        if (sportEventImage != null && sportEventImage.length > 0) {
            fileUtil.saveFile(savedSportEvent.getId().toString(), "image", sportEventImage);
        }
        return savedSportEvent;
    }

    @Override
    public SportEvent updateSportEvent(Long id, SportEvent sportEvent, byte[] sportEventImage) {
        sportEvent.setId(id);
        SportEvent updatedSportEvent = sportEventRepository.save(sportEvent);
        if (sportEventImage != null && sportEventImage.length > 0) {
            fileUtil.saveFile(id.toString(), "image", sportEventImage);
        }
        return updatedSportEvent;
    }

    @Override
    public Optional<SportEvent> getSportEventById(Long id) {
        return sportEventRepository.findById(id);
    }

    @Override
    public void removeSportEvent(Long id) {
        sportEventRepository.deleteById(id);
    }
}
