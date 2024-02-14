# 기본 이미지로 OpenJDK 11 사용
FROM adoptopenjdk:11-jdk

# 애플리케이션 JAR 파일 복사
COPY ./build/libs/haryeom-0.0.1-SNAPSHOT.jar /app.jar

# 실행할 명령어 설정
ENTRYPOINT ["java", "-jar", "/app.jar"]