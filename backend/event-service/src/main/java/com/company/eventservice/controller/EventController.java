package com.company.eventservice.controller;

import com.company.eventservice.dto.EventDto;
import com.company.eventservice.model.Event;
import com.company.eventservice.service.EventService;
import com.company.eventservice.util.FileUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final ModelMapper modelMapper;
    private final FileUtil fileUtil;

    @GetMapping
    public List<EventDto> getFilteredEvents(
            @RequestParam(required = false) Optional<String> country,
            @RequestParam(required = false) Optional<String> city,
            @RequestParam(required = false) Optional<Boolean> startsToday,
            @RequestParam(required = false) Optional<Boolean> freeEntrance,
            @RequestParam(required = false) Optional<List<String>> categories,
            @RequestParam(required = false, defaultValue = "startDateTime") String sortBy) {

        return eventService
                .getFilteredEvents(country, city, startsToday, freeEntrance, categories, sortBy)
                .stream()
                .map(event -> mapEventToDto(event, eventService.getEventImage(event.getId())))
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveEvent(@RequestBody @Valid EventDto eventDto) {
        Event event = mapDtoToEvent(eventDto);
        byte[] eventImage = getByteArrayFromBase64(eventDto.getImageBase64());
        eventService.saveEvent(event, eventImage);
    }

    @DeleteMapping("/{id}")
    public void removeEventById(@PathVariable Long id) {
        eventService.removeEvent(id);
    }

    private Event mapDtoToEvent(EventDto eventDto) {
        Event event = modelMapper.map(eventDto, Event.class);
        event.setStartDateTimeFromString(eventDto.getStartDateTime());
        return event;
    }

    private EventDto mapEventToDto(Event event, byte[] eventImage) {
        EventDto eventDto = modelMapper.map(event, EventDto.class);
        eventDto.setStartDateTime(event.getFormattedStartDateTime());
        if (eventImage != null && eventImage.length > 0) {
            eventDto.setImageBase64(fileUtil.encodeBase64(eventImage));
        }
        return eventDto;
    }

    private byte[] getByteArrayFromBase64(String fileBase64) {
        byte[] file = null;
        if (StringUtils.isNotBlank(fileBase64)) {
            file = fileUtil.decodeBase64(fileBase64);
        }
        return file;
    }
}
