package com.company.sporteventservice.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "sport_events")
@Data
public class SportEvent {
    private static final String DATE_FORMAT = "dd/MM/yyyy HH:mm";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sport_category_id")
    private SportCategory sportCategory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id")
    private Location location;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime startDateTime;

    private Float ticketPrice;

    public String getFormattedDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        return startDateTime.format(formatter);
    }

    public void setDateFromFormattedString(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        this.startDateTime = LocalDateTime.parse(dateString, formatter);
    }
}
