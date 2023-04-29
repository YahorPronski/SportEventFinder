package com.company.sporteventservice.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "sport_categories")
@Data
public class SportCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "sportCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SportEvent> sportEvents;
}
