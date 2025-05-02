package com.github.erfanarvan.serverapp;

import org.springframework.web.bind.annotation.*;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
public class SubmissionController {

    // ---- Phase 1: Receive Summaries ----
    @CrossOrigin(origins = {
        "http://localhost:8000",
        "http://codecomprehensibility.site"
    })
    @PostMapping("/submit")
    public String handlePhase1(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("name", "Anonymous");
        try (FileWriter writer = new FileWriter("phase1_submissions.txt", true)) {
            writer.write("=== Phase 1 Submission ===\n");
            writer.write("Time: " + LocalDateTime.now() + "\n");
            writer.write("Name: " + name + "\n");
            for (Map.Entry<String, String> entry : body.entrySet()) {
                if (!entry.getKey().equals("name")) {
                    writer.write(entry.getKey() + ": " + entry.getValue() + "\n");
                }
            }
            writer.write("\n");
            return "Submission received.";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error writing submission.";
        }
    }

        // ---- Phase 2: Receive Rankings + Reasoning ----
    @CrossOrigin(origins = {
        "http://localhost:8000",
        "http://codecomprehensibility.site"
    })
    @PostMapping("/submit_phase2")
    public String handlePhase2(@RequestBody Phase2Submission submission) {
        try (FileWriter writer = new FileWriter("phase2_submissions.txt", true)) {
            writer.write("=== Phase 2 Submission ===\n");
            writer.write("Time: " + LocalDateTime.now() + "\n");
            writer.write("Name: " + submission.getName() + "\n");
            writer.write("Ranking: " + String.join(", ", submission.getRanking()) + "\n");
            writer.write("Reasoning: " + submission.getReasoning() + "\n\n");
            return "Phase 2 submission received.";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error saving Phase 2 data.";
        }
    }

    // Inner class to deserialize Phase 2 JSON
    public static class Phase2Submission {
        private String name;
        private String[] ranking;
        private String reasoning;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String[] getRanking() { return ranking; }
        public void setRanking(String[] ranking) { this.ranking = ranking; }

        public String getReasoning() { return reasoning; }
        public void setReasoning(String reasoning) { this.reasoning = reasoning; }
    }
}
