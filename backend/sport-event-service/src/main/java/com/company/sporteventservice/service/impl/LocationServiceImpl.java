package com.company.sporteventservice.service.impl;

import com.company.sporteventservice.model.Location;
import com.company.sporteventservice.repository.LocationRepository;
import com.company.sporteventservice.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public  Map<String, Set<String>> getLocations() {
        List<Location> allLocations = locationRepository.findAll();

        return allLocations.stream()
                .collect(Collectors.groupingBy(Location::getCountry,
                        Collectors.mapping(Location::getCity, Collectors.toSet())));
    }

}
