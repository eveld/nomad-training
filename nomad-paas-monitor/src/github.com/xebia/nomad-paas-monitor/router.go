package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Route struct {
  Name          string
  Method        string
  Pattern       string
  HandlerFunc   http.HandlerFunc
}

type Routes []Route

var routes = Routes{
  Route{
    "Environment",
    "GET",
    "/environment",
    EnvironmentHandler,
  },
	Route{
    "ID",
    "GET",
    "/id",
    IDHandler,
  },
  Route{
    "Health",
    "GET",
    "/health",
    HealthHandler,
  },
	Route{
    "Uptime",
    "GET",
    "/uptime",
    UptimeHandler,
  },
  Route{
    "Message",
    "POST",
    "/messages",
    AddMessageHandler,
  },
  Route{
    "Message",
    "GET",
    "/messages",
    ListMessagesHandler,
  },
  Route{
    "Kill",
    "GET",
    "/kill",
    KillHandler,
  },
}

func NewRouter() *mux.Router {
  router := mux.NewRouter().StrictSlash(true)
  for _, route := range routes {
    router.Methods(route.Method).Path(route.Pattern).Name(route.Name).Handler(route.HandlerFunc)
  }
  router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("assets/"))))
  return router
}
