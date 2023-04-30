FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY target/api-gateway-1.0.0.jar .

CMD ["sh", "-c", "java $JAVA_OPTS -jar api-gateway-1.0.0.jar"]