# ❤️ Love Counter 

A simple animated web page that counts how long two people have been in love together. Shows years, months, days, hours, minutes, and seconds, with floating hearts and confetti for celebrations.

---

## Features

* Absolute **Years, Months, Days** counter
* **Hours, Minutes, Seconds** reset like a real clock
* 🎉 Confetti for anniversaries
* ❤️ Floating hearts animation
* ❤️ Favicon
* Easy to deploy via **Docker + Nginx**
* Customization for your own needs

---

## Customization

* The names of both lovers can be changed in the environment variable in the docker-compose.yml file
```   
    environment:
      - LOVER_ONE=Alice
      - LOVER_TWO=Bob
``` 
* The start time can either be directly (recommenden) set in the environment variable in the docker-compose.yml file or in the input field on the website
```   
    environment:
      - START_DATE=2020-01-01T12:00
``` 
* Changes made to the start time directly in the deployed website is stored in **localStorage**
* Aswell the port on wich the website should run is defined in the docker-compose.yml file
```   
    ports:
    HOST_PORT:PORT_INSIDE_CONTAINER (leave default)
      - "8083:80"
``` 

---

## Project Structure

```
love-counter/
│── index.html
│── style.css
│── script.js
│── favicon.ico
│── favicon-32x32.png
│── favicon-16x16.png
│── Dockerfile
│── docker-compose.yml
│── README.md
```

---

## Running Locally with Docker

### Build & run

```bash
# Build Docker image
docker-compose build --no-cache

# Start container
docker-compose up -d
```

### Access

Open your browser at: [http://localhost:8083](http://localhost:8083)

### Stop container

```bash
docker-compose down
```

---

