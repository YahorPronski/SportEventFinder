package com.company.eventservice.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "events")
@Data
public class Event {
    public static final String DATE_FORMAT = "dd/MM/yyyy HH:mm";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id")
    private Location location;

    @Column(columnDefinition = "TIMESTAMP")
    private LocalDateTime startDateTime;

    private Float ticketPrice;

    public String getFormattedStartDateTime() {
        return startDateTime != null ? startDateTime.format(formatter): null;
    }

    public void setStartDateTimeFromString(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        this.startDateTime = LocalDateTime.parse(dateString, formatter);
    }
}
