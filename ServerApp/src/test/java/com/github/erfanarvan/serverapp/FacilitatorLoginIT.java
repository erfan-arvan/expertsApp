package edu.njit.jerse.daikonplusplus;

import static org.junit.jupiter.api.Assertions.*;
import java.io.IOException;
import java.nio.file.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class FacilitatorLoginIT {

    private static final String BASE_URL = "http://localhost:8080";

    @Test
    void testFacilitatorLogin() throws IOException {
        // Load password from same JSON file used by the backend
        Path path = Paths.get("src/main/resources/participants.json");
        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(path.toFile());
        String password = root.path("passwords").path("facilitator").asText();

        assertNotNull(password, "Facilitator password should not be null or missing");
        assertFalse(password.isBlank(), "Facilitator password must not be blank");

        // Prepare login payload
        String username = "facilitator";
        var payload = new java.util.HashMap<String, String>();
        payload.put("username", username);
        payload.put("password", password);

        // Send POST request to /get_snippet_order endpoint
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(
                BASE_URL + "/get_snippet_order",
                payload,
                String.class
        );

        // Validate the response
        assertEquals(HttpStatus.OK, response.getStatusCode(), "Login should succeed for facilitator");
        assertTrue(response.getBody().contains("snippetOrder"), "Response should include snippet order");
    }
}
