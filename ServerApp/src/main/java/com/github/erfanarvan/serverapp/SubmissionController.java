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
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import java.nio.charset.StandardCharsets;

import java.util.UUID;
import java.util.stream.Collectors;



@RestController
public class SubmissionController {

    private static final File CHAT_DIR  = new File("submissions/chat");
    private static final File CHAT_FILE = new File(CHAT_DIR, "chats_all.json");

    
    // TODO: Move Hard coding Passwords to a separate DB
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
        "martin", List.of(3, 1, 4, 7, 8, 2, 6, 5),
        "oscar", List.of(1, 2, 3, 4, 5, 6, 7, 8),
        "erfan", List.of(6, 7, 8, 1, 2, 3, 4, 5),
        "nadeeshan", List.of(7, 6, 8, 1, 2, 3, 4, 5)
    );

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
        String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        Object submittedObj = body.get("submitted");
        boolean isFinal = "1".equals(submittedObj) || Boolean.TRUE.equals(submittedObj);

        System.out.println(">>> [submit_final] Received submission:");
        // System.out.println(">>> Username: " + username);
        // System.out.println(">>> Timestamp: " + timestamp);
        // System.out.println(">>> raw 'submitted' value: " + submittedObj);
        // System.out.println(">>> Parsed isFinal: " + isFinal);
        // System.out.println(">>> Body Keys: " + body.keySet());
        // System.out.println(">>> Raw Body Preview: " + truncateJson(body, 1000));

        File directory = new File("submissions");
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println(">>> Created 'submissions' directory.");
        }

        File allFile = new File("submissions/all_submissions.json");
        File finalFile = new File("submissions/final_submissions.json");
        System.out.println(">>> allFile path: " + allFile.getAbsolutePath());
        System.out.println(">>> finalFile path: " + finalFile.getAbsolutePath());

        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("isFinal", isFinal);
            wrapped.put("data", body);

            Map<String, List<Map<String, Object>>> allData = allFile.exists()
                ? mapper.readValue(allFile, new TypeReference<>() {})
                : new HashMap<>();
            allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(allFile, allData);
            System.out.println(">>> Saved to all_submissions.json");

            if (isFinal) {
                Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                    ? mapper.readValue(finalFile, new TypeReference<>() {})
                    : new HashMap<>();
                finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
                mapper.writeValue(finalFile, finalData);
                System.out.println(">>> Saved to final_submissions.json");
            }

            return "Submission saved.";
        } catch (IOException e) {
            System.err.println(">>> ERROR while saving submission for: " + username);
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

    @CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
    @PostMapping("/submit_students_part")
    public synchronized String handleStudentSubmission(@RequestBody Map<String, Object> body) {
        String username = (String) body.getOrDefault("username", "anonymous");
        String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        Object submittedObj = body.get("submitted");
        boolean isFinal = "1".equals(submittedObj) || Boolean.TRUE.equals(submittedObj);

        System.out.println(">>> [submit_students_part] Submission received from: " + username);
        System.out.println(">>> Timestamp: " + timestamp);
        // System.out.println(">>> Final flag: " + isFinal);
        // System.out.println(">>> Body Preview: " + truncateJson(body, 1000));

        File directory = new File("submissions");
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println(">>> Created 'submissions' directory.");
        }

        File allFile = new File("submissions/students.json");
        File finalFile = new File("submissions/studentsFinal.json");

        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("isFinal", isFinal);
            wrapped.put("data", body);

            // Save to students.json
            List<Map<String, Object>> allData = allFile.exists()
                ? mapper.readValue(allFile, new TypeReference<>() {})
                : new ArrayList<>();
            allData.add(wrapped);
            mapper.writeValue(allFile, allData);
            System.out.println(">>> Saved to students.json");

            // If final, also save to studentsFinal.json
            if (isFinal) {
                List<Map<String, Object>> finalData = finalFile.exists()
                    ? mapper.readValue(finalFile, new TypeReference<>() {})
                    : new ArrayList<>();
                finalData.add(wrapped);
                mapper.writeValue(finalFile, finalData);
                System.out.println(">>> Saved to studentsFinal.json");
            }

            return "Student submission saved.";
        } catch (IOException e) {
            System.err.println(">>> ERROR saving student submission for: " + username);
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save student submission.");
        }
    }

    private String escapeJson(String s) {
        return s
            .replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r");
    }

    private void sendEmailViaPython(String to, String subject, String message) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c",
                "echo " + escapeForShell(String.format(
                    "{\"to\":\"%s\", \"subject\":\"%s\", \"message\":\"%s\"}",
                    escapeJson(to), escapeJson(subject), escapeJson(message)
                )) + " | python3 /home/ubuntu/emailService/send_email.py"
            );

            processBuilder.redirectErrorStream(true); // Merge stderr with stdout
            Process process = processBuilder.start();

            try (Scanner scanner = new Scanner(process.getInputStream())) {
                while (scanner.hasNextLine()) {
                    System.out.println(">>> Python Output: " + scanner.nextLine());
                }
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println(">>> Email successfully sent to: " + to);
            } else {
                System.err.println(">>> Failed to send email to: " + to + " (exit code: " + exitCode + ")");
            }
        } catch (Exception e) {
            System.err.println(">>> Exception while sending email to: " + to);
            e.printStackTrace();
        }
    }

    private String escapeForShell(String input) {
        return "'" + input.replace("'", "'\"'\"'") + "'";
    }

    @CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
    @PostMapping("/register_student")
    public synchronized String handleStudentRegistration(@RequestBody Map<String, Object> body) {
        String email = (String) body.getOrDefault("email", "unknown");
        String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                        .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

        System.out.println(">>> [register_student] Registration received from: " + email);
        System.out.println(">>> Timestamp: " + timestamp);

        File directory = new File("submissions");
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println(">>> Created 'submissions' directory.");
        }

        File registrationFile = new File("submissions/registration.json");
        ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

        try {
            Map<String, Object> wrapped = new HashMap<>();
            wrapped.put("timestamp", timestamp);
            wrapped.put("data", body);

            List<Map<String, Object>> allData = registrationFile.exists()
                ? mapper.readValue(registrationFile, new TypeReference<>() {})
                : new ArrayList<>();
            allData.add(wrapped);
            mapper.writeValue(registrationFile, allData);
            System.out.println(">>> Saved to registration.json");

            // ==== Determine Event Type and Send Appropriate Email ====
            String sessionTime = body.getOrDefault("selectedSlot", "unspecified").toString();
            String event = body.getOrDefault("event", "register").toString().toLowerCase().trim();
            String subject;
            String message;
            String customAvailability = body.getOrDefault("customAvailability", "Not specified").toString();


            switch (event) {
                case "cancel":
                    subject = "Code Comprehension Study Registration Canceled";
                    message = "Your registration for the Code Comprehension Study has been successfully canceled.\n\n" +
                            "If this was a mistake or you’d like to pick a new time slot, please re-register at:\n" +
                            "https://codecomprehensibility.site/eligibility.html\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;

                case "modify":
                    subject = "Code Comprehension Study Registration Updated";
                    String modifyLink = "https://codecomprehensibility.site/cancelModifyRegistration.html" +
                                        "?email=" + java.net.URLEncoder.encode(email, StandardCharsets.UTF_8) +
                                        "&slot=" + java.net.URLEncoder.encode(sessionTime, StandardCharsets.UTF_8);

                    message = "You've successfully modified your session for the Code Comprehension Study.\n\n" +
                            "📅 Your updated session time: " + sessionTime + "\n\n" +
                            "If you need to cancel or modify again, please use this link:\n" + modifyLink + "\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;
                case "pending":
                    subject = "Code Comprehension Study – Availability Received";

                    message = "Thank you for suggesting your available time slots for the Code Comprehension Study.\n\n" +
                            "📅 Your availability:\n" +
                            customAvailability + "\n\n" +
                            "We'll review your responses and reach out shortly to confirm your session time.\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;
            case "availability":
                subject = "Code Comprehension Study – Availability Received";

                message = "Thank you for sharing your available time slots for the Code Comprehension Study.\n\n" +
                        "📅 Your availability:\n" +
                        sessionTime + "\n\n" +
                        "We'll review your availability and follow up soon to confirm your session time and location.\n" +
                        "The session will take place at NJIT, in one of the rooms in the GITC building.\n\n" +
                        "If you have any questions or concerns, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                        "— Code Comprehension Study Team";
                break;
                case "register":
                default:
                    subject = "Code Comprehension Study Registration Confirmation";
                    String cancelLink = "https://codecomprehensibility.site/cancelModifyRegistration.html" +
                                        "?email=" + java.net.URLEncoder.encode(email, StandardCharsets.UTF_8) +
                                        "&slot=" + java.net.URLEncoder.encode(sessionTime, StandardCharsets.UTF_8);

                    message = "Thank you for registering!\n\n" +
                            "📅 Your session is scheduled for: " + sessionTime + "\n\n" +
                            "We'll follow up with the exact room location, but it will be in one of the rooms at GITC, NJIT.\n\n" +
                            "If you want to cancel or change your time slot, please use this link:\n" + cancelLink + "\n\n" +
                            "If you have any questions or issues, please reply to this email or contact us at ea442@njit.edu.\n\n" +
                            "— Code Comprehension Study Team";
                    break;
            }

            System.out.println(">>> Sending " + event + " email to: " + email);
            sendEmailViaPython(email, subject, message);

            return "Registration saved.";
        } catch (IOException e) {
            System.err.println(">>> ERROR saving registration for: " + email);
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save registration.");
        }
    }

@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/register_expert")
public synchronized String handleExpertRegistration(@RequestBody Map<String, Object> body) {
    String email = (String) body.getOrDefault("email", "unknown");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    System.out.println(">>> [register_expert] Registration received from: " + email);
    System.out.println(">>> Timestamp: " + timestamp);

    File directory = new File("submissions");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions' directory.");
    }

    File registrationFile = new File("submissions/expert_registration.json");
    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("data", body);

        List<Map<String, Object>> allData = registrationFile.exists()
            ? mapper.readValue(registrationFile, new TypeReference<>() {})
            : new ArrayList<>();
        allData.add(wrapped);
        mapper.writeValue(registrationFile, allData);
        System.out.println(">>> Saved to expert_registration.json");

        // Email Content Logic
        String event = body.getOrDefault("event", "register").toString().toLowerCase().trim();
        String subject, message;
        String sessionTime = body.getOrDefault("selectedSlot", "unspecified").toString();

        switch (event) {
            case "appointment":
                subject = "Availability Received – Expert Participation in Code Comprehension Study";
                message = "Thank you for providing your available time slots for the Code Comprehension Study.\n\n" +
                          "📅 Your availability: " + sessionTime + "\n\n" +
                          "We'll follow up shortly to finalize an appointment.\n\n" +
                          "If you have any questions, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                          "— Code Comprehension Study Team";
                break;

            case "consent":
                subject = "Consent Form Received – Code Comprehension Study";
                message = "Thank you for signing the consent form for the Code Comprehension Study.\n\n" +
                          "We’ve received your submission and will contact you soon with further instructions.\n\n" +
                          "If you have any questions, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                          "— Code Comprehension Study Team";
                break;

            default:
                subject = "Expert Registration – Code Comprehension Study";
                message = "Your registration for the Code Comprehension Study has been received.\n\n" +
                          "We'll be in touch shortly to coordinate the next steps.\n\n" +
                          "If you have any questions, feel free to reply to this email or contact us at ea442@njit.edu.\n\n" +
                          "— Code Comprehension Study Team";
                break;
        }

        System.out.println(">>> Sending " + event + " email to: " + email);
        sendEmailViaPython(email, subject, message);

        return "Expert registration saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving expert registration for: " + email);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save expert registration.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/submit_round2")
public synchronized String handleRound2Submission(@RequestBody Map<String, Object> body) {
    String username = (String) body.getOrDefault("username", "anonymous");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    boolean isFinal = "1".equals(String.valueOf(body.get("submitted")));

    System.out.println(">>> [submit_round2] Submission received from: " + username);

    File directory = new File("submissions/round2");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions/round2' directory.");
    }

    File allFile = new File(directory, "round2_all.json");
    File finalFile = new File(directory, "round2_final.json");

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("isFinal", isFinal);
        wrapped.put("data", body);

        Map<String, List<Map<String, Object>>> allData = allFile.exists()
            ? mapper.readValue(allFile, new TypeReference<>() {})
            : new HashMap<>();
        allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
        mapper.writeValue(allFile, allData);
        System.out.println(">>> Saved to round2_all.json");

        if (isFinal) {
            Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                ? mapper.readValue(finalFile, new TypeReference<>() {})
                : new HashMap<>();
            finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(finalFile, finalData);
            System.out.println(">>> Saved to round2_final.json");
        }

        return "Round 2 submission saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving round2 submission for: " + username);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save round2 submission.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/get_latest_round2")
public Map<String, Object> getLatestRound2Submission(@RequestBody Map<String, String> request) {
    String username = request.getOrDefault("username", "anonymous");
    File file = new File("submissions/round2/round2_all.json");
    ObjectMapper mapper = new ObjectMapper();

    try {
        if (!file.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 2 submissions found.");
        }

        Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
        List<Map<String, Object>> userSubs = allData.get(username);
        if (userSubs == null || userSubs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 2 submission for user.");
        }

        return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read Round 2 submission.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/submit_round3")
public synchronized String handleRound3Submission(@RequestBody Map<String, Object> body) {
    String username = (String) body.getOrDefault("username", "anonymous");
    String timestamp = ZonedDateTime.now(ZoneId.of("America/New_York"))
                                    .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);

    boolean isFinal = "1".equals(String.valueOf(body.get("submitted")));

    System.out.println(">>> [submit_round3] Submission received from: " + username);

    File directory = new File("submissions/round3");
    if (!directory.exists()) {
        directory.mkdirs();
        System.out.println(">>> Created 'submissions/round3' directory.");
    }

    File allFile = new File(directory, "round3_all.json");
    File finalFile = new File(directory, "round3_final.json");

    ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);

    try {
        Map<String, Object> wrapped = new HashMap<>();
        wrapped.put("timestamp", timestamp);
        wrapped.put("isFinal", isFinal);
        wrapped.put("data", body);

        Map<String, List<Map<String, Object>>> allData = allFile.exists()
            ? mapper.readValue(allFile, new TypeReference<>() {})
            : new HashMap<>();
        allData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
        mapper.writeValue(allFile, allData);
        System.out.println(">>> Saved to round3_all.json");

        if (isFinal) {
            Map<String, List<Map<String, Object>>> finalData = finalFile.exists()
                ? mapper.readValue(finalFile, new TypeReference<>() {})
                : new HashMap<>();
            finalData.computeIfAbsent(username, k -> new ArrayList<>()).add(wrapped);
            mapper.writeValue(finalFile, finalData);
            System.out.println(">>> Saved to round3_final.json");
        }

        return "Round 3 submission saved.";
    } catch (IOException e) {
        System.err.println(">>> ERROR saving round3 submission for: " + username);
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save round3 submission.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/get_latest_round3")
public Map<String, Object> getLatestRound3Submission(@RequestBody Map<String, String> request) {
    String username = request.getOrDefault("username", "anonymous");
    File file = new File("submissions/round3/round3_all.json");
    ObjectMapper mapper = new ObjectMapper();

    try {
        if (!file.exists()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 3 submissions found.");
        }

        Map<String, List<Map<String, Object>>> allData = mapper.readValue(file, new TypeReference<>() {});
        List<Map<String, Object>> userSubs = allData.get(username);
        if (userSubs == null || userSubs.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Round 3 submission for user.");
        }

        return (Map<String, Object>) userSubs.get(userSubs.size() - 1).get("data");
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read Round 3 submission.");
    }
}


    private String truncateJson(Map<String, Object> body, int maxLen) {
    try {
        ObjectMapper previewMapper = new ObjectMapper();
        String full = previewMapper.writeValueAsString(body);
        return full.length() > maxLen ? full.substring(0, maxLen) + "... [truncated]" : full;
    } catch (Exception e) {
        return "[error printing JSON]";
    }
}

private String nowIso() {
    return ZonedDateTime.now(ZoneId.of("America/New_York"))
            .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
}

private void ensureChatStoreExists() {
    if (!CHAT_DIR.exists()) {
        CHAT_DIR.mkdirs();
        System.out.println(">>> Created 'submissions/chat' directory.");
    }
    if (!CHAT_FILE.exists()) {
        try {
            ObjectMapper mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
            Map<String, Object> root = new HashMap<>();
            root.put("chats", new HashMap<String, List<Map<String, Object>>>());
            root.put("updatedAt", nowIso());
            mapper.writeValue(CHAT_FILE, root);
            System.out.println(">>> Initialized chats_all.json");
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to initialize chat store");
        }
    }
}

/** Loads the full shared chat object: { chats: {...}, updatedAt: ... } */
@SuppressWarnings("unchecked")
private Map<String, Object> readChatStore(ObjectMapper mapper) throws IOException {
    ensureChatStoreExists();
    return mapper.readValue(CHAT_FILE, new TypeReference<Map<String, Object>>() {});
}

/** Writes the full shared chat object. */
private void writeChatStore(ObjectMapper mapper, Map<String, Object> store) throws IOException {
    store.put("updatedAt", nowIso());
    mapper.enable(SerializationFeature.INDENT_OUTPUT).writeValue(CHAT_FILE, store);
}

@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/get_latest_chat")
public synchronized Map<String, Object> getLatestChat(@RequestBody Map<String, String> req) {
    // username may be provided by the client; we don't need it here for a shared store.
    ObjectMapper mapper = new ObjectMapper();
    try {
        return readChatStore(mapper);
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read chat.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/submit_chat")
public synchronized Map<String, Object> submitChat(@RequestBody Map<String, Object> req) {
    String username = Objects.toString(req.get("username"), "").trim();
    String disagreementId = Objects.toString(req.get("disagreementId"), "").trim();
    String parentId = req.get("parentId") == null ? null : Objects.toString(req.get("parentId"), "").trim();
    String content = Objects.toString(req.get("content"), "").trim();

    if (username.isEmpty() || disagreementId.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username and disagreementId are required");
    }
    if (content.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "content is required");
    }

    ObjectMapper mapper = new ObjectMapper();
    try {
        Map<String, Object> store = readChatStore(mapper);

        @SuppressWarnings("unchecked")
        Map<String, List<Map<String, Object>>> chats =
                (Map<String, List<Map<String, Object>>>) store.get("chats");

        List<Map<String, Object>> thread =
                chats.computeIfAbsent(disagreementId, k -> new ArrayList<>());

        // If replying, parent must exist within the same disagreement thread
        if (parentId != null && !parentId.isBlank()) {
            boolean parentExists = thread.stream().anyMatch(m -> parentId.equals(m.get("id")));
            if (!parentExists) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "parentId not found in this disagreement thread");
            }
        }

        Map<String, Object> msg = new HashMap<>();
        msg.put("id", UUID.randomUUID().toString());
        msg.put("parentId", parentId);          // null for root
        msg.put("username", username);
        msg.put("content", content);
        msg.put("createdAt", nowIso());
        msg.put("is_deleted", false);
        msg.put("up", 0);
        msg.put("down", 0);

        thread.add(msg);
        writeChatStore(mapper, store);

        return store; // return full shared chat so client can refresh state easily
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to write chat.");
    }
}

@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/delete_chat")
public synchronized Map<String, Object> deleteChat(@RequestBody Map<String, Object> req) {
    String username = Objects.toString(req.get("username"), "").trim();
    String messageId = Objects.toString(req.get("messageId"), "").trim();

    if (username.isEmpty() || messageId.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username and messageId are required");
    }

    ObjectMapper mapper = new ObjectMapper();
    try {
        Map<String, Object> store = readChatStore(mapper);

        @SuppressWarnings("unchecked")
        Map<String, List<Map<String, Object>>> chats =
                (Map<String, List<Map<String, Object>>>) store.get("chats");

        boolean found = false;
        outer:
        for (Map.Entry<String, List<Map<String, Object>>> e : chats.entrySet()) {
            List<Map<String, Object>> thread = e.getValue();
            for (Map<String, Object> m : thread) {
                if (messageId.equals(m.get("id"))) {
                    // Only author can delete (soft delete)
                    String author = Objects.toString(m.get("username"), "");
                    if (!author.equals(username)) {
                        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the author can delete this message");
                    }
                    m.put("is_deleted", true);
                    m.put("content", ""); // hide content but keep username/time/replies
                    found = true;
                    break outer;
                }
            }
        }

        if (!found) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "messageId not found");
        }

        writeChatStore(mapper, store);
        return store;
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update chat.");
    }
}


@CrossOrigin(origins = {"http://localhost:8000", "http://codecomprehensibility.site"})
@PostMapping("/vote_chat")
public synchronized Map<String, Object> voteChat(@RequestBody Map<String, Object> req) {
    String username = Objects.toString(req.get("username"), "").trim();
    String messageId = Objects.toString(req.get("messageId"), "").trim();
    int delta;
    try {
        delta = Integer.parseInt(Objects.toString(req.get("delta"), "0"));
    } catch (NumberFormatException nfe) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "delta must be +1 or -1");
    }
    if (username.isEmpty() || messageId.isEmpty() || !(delta == 1 || delta == -1)) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "username, messageId and delta (+1/-1) are required");
    }

    ObjectMapper mapper = new ObjectMapper();
    try {
        Map<String, Object> store = readChatStore(mapper);
        @SuppressWarnings("unchecked")
        Map<String, List<Map<String, Object>>> chats =
            (Map<String, List<Map<String, Object>>>) store.get("chats");

        boolean found = false;
        for (List<Map<String, Object>> thread : chats.values()) {
            for (Map<String, Object> m : thread) {
                if (messageId.equals(m.get("id"))) {
                    // votes: username -> +1 / -1
                    @SuppressWarnings("unchecked")
                    Map<String, Object> votes = (Map<String, Object>) m.get("votes");
                    if (votes == null) {
                        votes = new HashMap<>();
                        m.put("votes", votes);
                    }

                    // Toggle / change vote
                    int prev = Integer.parseInt(Objects.toString(votes.getOrDefault(username, 0)));
                    if (prev == delta) {
                        // same vote again -> unvote
                        votes.remove(username);
                    } else {
                        votes.put(username, delta);
                    }

                    // Recompute up/down from votes map
                    int up = 0, down = 0;
                    for (Object vObj : votes.values()) {
                        int v = Integer.parseInt(Objects.toString(vObj));
                        if (v == 1) up++;
                        else if (v == -1) down++;
                    }
                    m.put("up", up);
                    m.put("down", down);

                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        if (!found) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "messageId not found");
        }

        writeChatStore(mapper, store);
        return store; // return full shared chat so clients can refresh easily
    } catch (IOException e) {
        e.printStackTrace();
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update vote.");
    }
}


}
