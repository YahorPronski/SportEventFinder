FROM openjdk:8-jdk-alpine

WORKDIR /app

COPY target/auth-server-1.0.0.jar .

CMD ["sh", "-c", "java $JAVA_OPTS -jar auth-server-1.0.0.jar"]