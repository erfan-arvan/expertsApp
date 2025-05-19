package com.github.erfanarvan.serverapp;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
public class SubmissionController {

    private static final Map<String, String> userPasswords = Map.of(
        "martin", "kudXKSspt6QT",
        "oscar", "NMgxVXWCn6D7",
        "erfan", "fmtHu98Tz7rd",
        "nadeeshan", "xGAXPnnLD3yH"
    );

    private static final Map<String, String> userNames = Map.of(
        "martin", "Martin Kellogg",
        "oscar", "Oscar Chaparro",
        "erfan", "Erfan Arvan",
        "nadeeshan", "De Silva, Nadeeshan"
    );

    private static final Map<String, List<Integer>> userSnippetOrders = Map.of(
        "martin", List.of(2, 0, 3, 6, 7, 1, 5, 4),
        "oscar", List.of(0, 1, 2, 3, 4, 5, 6, 7),
        "erfan", List.of(5, 6, 7, 0, 1, 2, 3, 4),
        "nadeeshan", List.of(6, 5, 7, 0, 1, 2, 3, 4)
    );

    @CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
    @PostMapping("/get_snippet_order")
    public Map<String, Object> getSnippetOrder(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (!userPasswords.containsKey(username) || !userPasswords.get(username).equals(password)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("participantName", userNames.get(username));
        response.put("snippetOrder", userSnippetOrders.get(username));
        return response;
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
    @PostMapping("/submit_final")
    public synchronized String handleFinalSubmission(@RequestBody Map<String, Object> body) {
        String username = (String) body.getOrDefault("username", "anonymous");
        String timestamp = LocalDateTime.now().toString();

        File file = new File("submissions/all_submissions.json");
        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
        Map<String, List<Map<String, Object>>> allData;

        try {
            if (file.exists()) {
                allData = mapper.readValue(file, new TypeReference<>() {});
            } else {
                allData = new HashMap<>();
            }

            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("data", body);

            allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(file, allData);

            return "Submission saved.";
        } catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save submission.");
        }
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
    @PostMapping("/get_latest_submission")
    public Map<String, Object> getLatestSubmission(@RequestBody Map<String, String> request) {
        String username = request.getOrDefault("username", "anonymous");
        File file = new File("submissions/all_submissions.json");
        ObjectMapper mapper = new ObjectMapper();

        try {
            if (!file.exists()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No submissions found.");
            }

            Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
            List<Map<String, Object>> userSubs = allData.get(username);
            if (userSubs == null || userSubs.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No submission for user.");
            }

            return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");

        } catch (IOException e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read submission.");
        }
    }
}
