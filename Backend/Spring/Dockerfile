FROM openjdk:8-jdk

WORKDIR /server

COPY ./build/libs/receipt-0.0.1-SNAPSHOT.jar spring.jar 

ENTRYPOINT ["java", "-jar", "spring.jar"]