package com.company.eventservice.repository;

import com.company.eventservice.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByCountryAndCityAndAddress(String country, String city, String address);
}
