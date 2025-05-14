package com.github.erfanarvan.serverapp;

import org.springframework.web.bind.annotation.*;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import org.springframework.web.server.ResponseStatusException;


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
            throw new ResponseStatusException(org.springframework.http.HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("participantName", userNames.get(username));
        response.put("snippetOrder", userSnippetOrders.get(username));
        return response;
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
    @PostMapping("/submit_final")
    public String handleFinalSubmission(@RequestBody Map<String, Object> body) {
        Object nameObj = body.get("participantName");
        String participantName = (nameObj instanceof String) ? (String) nameObj : "Anonymous";
        //debugging
        System.out.println("Received submission keys: " + body.keySet());
        System.out.println("Raw participantName: " + body.get("participantName"));


        try (FileWriter writer = new FileWriter("final_submissions.txt", true)) {
            writer.write("=== Final Submission ===\n");
            writer.write("Time: " + LocalDateTime.now() + "\n");
            writer.write("Name: " + participantName + "\n");

            writer.write("Phase 1:\n");
            Map<String, Object> phase1 = (Map<String, Object>) body.get("phase1");
            if (phase1 != null) {
                for (Map.Entry<String, Object> entry : phase1.entrySet()) {
                    writer.write("  " + entry.getKey() + ": " + entry.getValue() + "\n");
                }
            }

            writer.write("Phase 2 (Ranking):\n");
            Map<String, Object> phase2 = (Map<String, Object>) body.get("phase2");
            if (phase2 != null) {
                for (Map.Entry<String, Object> entry : phase2.entrySet()) {
                    writer.write("  " + entry.getKey() + ": " + entry.getValue() + "\n");
                }
            }

            writer.write("Phase 3 (Reasoning):\n");
            Map<String, Object> phase3 = (Map<String, Object>) body.get("phase3");
            if (phase3 != null) {
                for (Map.Entry<String, Object> entry : phase3.entrySet()) {
                    writer.write("  " + entry.getKey() + ": " + entry.getValue() + "\n");
                }
            }

            writer.write("\n");
            return "All phases submitted.";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error saving final data.";
        }
    }
}
