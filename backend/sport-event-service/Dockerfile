FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY target/sport-event-service-1.0.0.jar .

CMD ["sh", "-c", "java $JAVA_OPTS -jar sport-event-service-1.0.0.jar"]