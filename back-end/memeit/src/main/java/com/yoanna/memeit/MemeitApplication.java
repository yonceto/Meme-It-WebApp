package com.yoanna.memeit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UriComponentsBuilder;

import static com.yoanna.memeit.Constants.*;


@SpringBootApplication
public class MemeitApplication {
	private Integer serviceId;

	@Bean
	WebMvcConfigurer configurer () {
		return new WebMvcConfigurer() {
			@Override
			public void addResourceHandlers(ResourceHandlerRegistry registry) {
				String imagePathPattern = Constants.IMAGE_PATH + "**";
				registry.addResourceHandler(imagePathPattern).
						addResourceLocations(STATIC_IMAGES_FILE_PATH);
			}

			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS");
			}
		};
	}

	@EventListener
	public void handleContextStartedEvent(ContextRefreshedEvent contextRefreshedEvent) {
		System.out.println("Context started event received");
		try {
			registerServiceInPlatform();
		} catch (Throwable throwable) {
			System.out.printf("Error registering service in platform %s\n", throwable);
		}
	}

	@EventListener
	public void handleContextClosedEvent(ContextClosedEvent contextClosedEvent) {
		System.out.println("Context closed event received");
		try {
			deregisterServiceInPlatform();
		} catch (Throwable throwable) {
			System.out.printf("Error deregistering service in platform %s\n", throwable);
		}
	}

	private void registerServiceInPlatform() {
		System.out.printf("Attempting to register service in platform: %s\n", MEMEIT_DOMAIN_SERVICE_REGISTER_ADDRESS);
		RestTemplate restTemplate = new RestTemplate();

		UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(MEMEIT_DOMAIN_SERVICE_REGISTER_ADDRESS)
				.queryParam("name", "Yoanna MemeIt")
				.queryParam("address", "http://localhost:8080");
		HttpEntity reqEntity = new HttpEntity(null);

		ResponseEntity<Integer> retrievedId = restTemplate.exchange(builder.build().toUri(), HttpMethod.POST, reqEntity, Integer.class);
		serviceId = retrievedId.getBody();
		System.out.printf("Service registration successful.\n");
	}

	private void deregisterServiceInPlatform() {
		if (serviceId == null) {
			System.out.printf("Skipping service deregistration, serviceId is not set.\n");
			return;
		}

		String deregisterAddressWithServiceId = String.format(MEMEIT_DOMAIN_SERVICE_DEREGISTER_ADDRESS_TEMPLATE, serviceId);
		System.out.printf("Attempting to deregister service in platform: %s\n", deregisterAddressWithServiceId);

		RestTemplate restTemplate = new RestTemplate();
		HttpEntity reqEntity = new HttpEntity(null);
		restTemplate.exchange(deregisterAddressWithServiceId, HttpMethod.DELETE, reqEntity, Void.class);
		System.out.printf("Service deregistration successful.\n");
	}

	public static void main(String[] args) {
		SpringApplication.run(MemeitApplication.class, args);
	}
}










