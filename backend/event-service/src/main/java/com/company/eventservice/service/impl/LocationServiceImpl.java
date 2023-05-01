package com.company.eventservice.service.impl;

import com.company.eventservice.model.Location;
import com.company.eventservice.repository.LocationRepository;
import com.company.eventservice.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public Map<String, Set<String>> getLocations() {
        List<Location> locations = locationRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Location::getCountry)
                        .thenComparing(Location::getCity))
                .collect(Collectors.toList());

        return locations.stream()
                .collect(Collectors.groupingBy(Location::getCountry, TreeMap::new,
                        Collectors.mapping(Location::getCity, Collectors.toCollection(TreeSet::new))));
    }

}
