package main

import (
	"encoding/json"
	"net/http"
  "os"
  "strings"
  "io"
  "io/ioutil"
  "time"
)

var (
  start = time.Now().UTC().UnixNano()/1000000
  messages = []Message{}
  consulAddress = os.Getenv("CONSUL_ADDR")
)

// Show the environment variables.
func EnvironmentHandler(w http.ResponseWriter, r *http.Request) {
  w.WriteHeader(http.StatusOK)
  w.Header().Set("Content-Type", "application/json")

  var environment = make(map[string]string)
  for _, env := range os.Environ() {
    pair := strings.Split(env, "=")
    environment[pair[0]] = pair[1]
  }
  json.NewEncoder(w).Encode(environment)
}

// Show the ID of the application.
func IDHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)

  var id = os.Getenv("NOMAD_ALLOC_ID")
  json.NewEncoder(w).Encode(id)
}

// Show the current health status of the application.
func HealthHandler(w http.ResponseWriter, r *http.Request) {
  w.WriteHeader(http.StatusOK)
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode("ok")
}

// The time the PAAS Monitor started.
func UptimeHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(start)
}

// Handle incoming messages.
func AddMessageHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")

  var message Message
  body, _ := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
  if err := json.Unmarshal(body, &message); err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    json.NewEncoder(w).Encode(err.Error())
  } else {
    w.WriteHeader(http.StatusCreated)
    messages = append(messages, message)

		if len(messages) > 5 {
			messages = messages[1:]
		}
    json.NewEncoder(w).Encode("pong")
  }
}

// List received messages.
func ListMessagesHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(messages)
}

// Shutdown with an error.
func KillHandler(w http.ResponseWriter, r *http.Request) {
  os.Exit(1)
}
