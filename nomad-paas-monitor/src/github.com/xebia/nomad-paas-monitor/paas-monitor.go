package main

import (
	"log"
	"net"
	"fmt"
	"net/http"
	"time"
	"math/rand"
)

func main() {
	ticker := time.NewTicker(time.Millisecond * 5000)
	go func() {
    for t := range ticker.C {
			_, addresses, err := net.LookupSRV("paas-monitor", "tcp", "service.consul")
			if err != nil {
				log.Println(err);
			} else {
				// Get consul addresses of paas-monitor and ports.
				address := addresses[rand.Intn(len(addresses))]
				ips, err := net.LookupIP(address.Target)
				if err != nil {
					log.Println(err);
				} else {
					// Get the first ip (should just be one).
					ip := ips[0].String()
					SendMessage(ip, fmt.Sprintf("%d", address.Port))
					log.Printf("Sent at %v to %s:%s", t, ip, fmt.Sprintf("%d", address.Port))
				}
			}
    }
  }()

	router := NewRouter()
	log.Fatal(http.ListenAndServe(":80", router))
}
