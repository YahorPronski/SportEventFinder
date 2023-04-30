FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY target/user-service-1.0.0.jar .

CMD ["sh", "-c", "java $JAVA_OPTS -jar user-service-1.0.0.jar"]