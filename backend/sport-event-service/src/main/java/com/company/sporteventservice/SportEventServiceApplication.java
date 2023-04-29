package com.company.sporteventservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SportEventServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SportEventServiceApplication.class, args);
    }
}
