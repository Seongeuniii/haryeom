package com.ioi.haryeom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
public class HaryeomApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaryeomApplication.class, args);
	}

}
