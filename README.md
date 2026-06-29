# Code Comprehension Study — Paper Artifact

This repository contains the web application used to run the expert study described in our paper.
Participants completed multiple rounds of code comprehension tasks, discussed disagreements, and
refined their rankings through a structured Delphi-style process.

| Directory     | Role                                              |
|---------------|---------------------------------------------------|
| `ServerApp/`  | Spring Boot back-end (REST API + serves the UI)   |
| `client_side/`| Static HTML/JS front-end (study interface)        |

The back-end is configured to serve `client_side/` as static files, so **a single command starts everything**.

---

## Prerequisites

| Tool  | Version    | Check with       |
|-------|------------|------------------|
| JDK   | 17 or later| `java -version`  |
| Maven | 3.8 or later| `mvn -version`  |

---

## Running Locally

```bash
git clone https://github.com/erfan-arvan/expertsApp.git
cd expertsApp/ServerApp
mvn spring-boot:run
```

Wait for `Started Main in X.XXX seconds`, then open:

```
http://localhost:8080
```

---

## Demo Credentials

Accounts are defined in `ServerApp/users/experts_panel.json`:

| Username | Password |
|----------|----------|
| `demo1`  | `pass1`  |
| `demo2`  | `pass2`  |
| `demo3`  | `pass3`  |

---

## Key Pages

| URL | Description |
|-----|-------------|
| `http://localhost:8080/experts_app/index.html` | Round 1 – rate and summarise code snippets |
| `http://localhost:8080/experts_app/phase2.html`| Round 1 – rank snippets |
| `http://localhost:8080/discussion.html`        | Rounds 2–4 – expert discussion |
| `http://localhost:8080/round2-phase1.html`     | Round 2 – re-rate after group results |
| `http://localhost:8080/round3-phase1.html`     | Round 3 – further refinement |
| `http://localhost:8080/round4-phase1.html`     | Round 4 – final rankings |

---

## Notes

- Submission data is saved to `ServerApp/submissions/` (created automatically).
- Email notifications are disabled locally; any related log warnings can be ignored.
- Stop the server with `Ctrl+C`.
