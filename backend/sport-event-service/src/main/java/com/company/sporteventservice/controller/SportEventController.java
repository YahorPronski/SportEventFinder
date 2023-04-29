package com.company.sporteventservice.controller;

import com.company.sporteventservice.dto.SportEventDto;
import com.company.sporteventservice.model.SportEvent;
import com.company.sporteventservice.service.SportEventService;
import com.company.sporteventservice.util.FileUtil;
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
@RequestMapping(path = "/sport-events")
@RequiredArgsConstructor
public class SportEventController {

    private final SportEventService sportEventService;
    private final ModelMapper modelMapper;
    private final FileUtil fileUtil;

    @GetMapping
    public List<SportEventDto> getFilteredSportEvents(
            @RequestParam(required = false) Optional<String> country,
            @RequestParam(required = false) Optional<String> city,
            @RequestParam(required = false) Optional<Boolean> startsToday,
            @RequestParam(required = false) Optional<Boolean> freeEntrance,
            @RequestParam(required = false) Optional<List<String>> categories,
            @RequestParam(required = false, defaultValue = "startDate") String sortBy) {

        return sportEventService
                .getFilteredSportEvents(country, city, startsToday, freeEntrance, categories, sortBy)
                .stream()
                .map(sportEvent -> modelMapper.map(sportEvent, SportEventDto.class))
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void saveSportEvent(@RequestBody @Valid SportEventDto sportEventDto) {
        SportEvent sportEvent = modelMapper.map(sportEventDto, SportEvent.class);
        byte[] sportEventImage = getByteArrayFromBase64(sportEventDto.getImageBase64());
        sportEventService.saveSportEvent(sportEvent, sportEventImage);
    }

    @PutMapping("/{id}")
    public void updateSportEventById(@PathVariable Long id, @RequestBody @Valid SportEventDto sportEventDto) {
        SportEvent sportEvent = modelMapper.map(sportEventDto, SportEvent.class);
        byte[] sportEventImage = getByteArrayFromBase64(sportEventDto.getImageBase64());
        sportEventService.updateSportEvent(id, sportEvent, sportEventImage);
    }

    @DeleteMapping("/{id}")
    public void removeSportEventById(@PathVariable Long id) {
        sportEventService.removeSportEvent(id);
    }

    private byte[] getByteArrayFromBase64(String fileBase64) {
        byte[] file = null;
        if (StringUtils.isNotBlank(fileBase64)) {
            file = fileUtil.decodeBase64(fileBase64);
        }
        return file;
    }
}
