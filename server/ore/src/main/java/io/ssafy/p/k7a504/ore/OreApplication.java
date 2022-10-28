package io.ssafy.p.k7a504.ore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class OreApplication {
	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:application.yml,"
			+ "classpath:aws.yml";
	public static void main(String[] args) {
		new SpringApplicationBuilder(OreApplication.class)
				.properties(APPLICATION_LOCATIONS)
				.run(args);
	}

}
