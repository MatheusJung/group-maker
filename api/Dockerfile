# Estágio 1: Compilação segura usando apenas a JRE básica e o Maven Wrapper do seu projeto
FROM eclipse-temurin:21-jdk-noble AS build
WORKDIR /app

# Copia a estrutura do Maven Wrapper e o pom.xml primeiro (otimiza cache)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Garante permissão de execução e baixa as dependências (atualizando pacotes de quebra)
RUN apt-get update && apt-get upgrade -y \
    && chmod +x mvnw \
    && ./mvnw dependency:go-offline -B

# Copia o código-fonte e compila o projeto
COPY src ./src
RUN ./mvnw package -DskipTests

# Estágio 2: Imagem final de execução ultra enxuta e atualizada
FROM eclipse-temurin:21-jre-noble
WORKDIR /app

# Atualiza pacotes do SO contra vulnerabilidades de última hora
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# Cria usuário seguro sem privilégios root
RUN useradd -m -u 10001 spring
USER spring:spring

# Copia o JAR gerado no estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Configurações de porta exigidas pelo Render
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dserver.port=${PORT}", "app.jar"]
