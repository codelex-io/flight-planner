# Flight Planner ✈ ✈ ✈

## Goal

Your goal is to create an application which can store flights between different airports and allows you to search them.

## Getting Started

- Download dependencies: `npm install`
- Execute tests (your app must be running locally on port `8080`): `npm test`
- Generate demo data: `npm run demo`

## Assignments

**Before any step**

Create a branch named **exactly** as required in each step, otherwise pull request will be declined.
 
### 1. Setup project (branch name: *init*)

Create a **public** repository called *flight-planner* under your github account. Remember - your code will be visible to the world!

<details><summary>Java</summary>
<p>

Generate a project [@start.spring.io](https://start.spring.io)

Choose:

 - gradle project
 - Java 11
 - latest stable Spring Boot version
 - group - *io.codelex*
 - artifact - *flight-planner*
 - add dependencies - web, spring-security

Download generated project, add everything to your repository, *commit & push*.

Then follow **all** the steps mentioned in [codelex-io/example-spring-project](https://github.com/codelex-io/example-spring-project) repository.

</p>
</details>

**Definition of Done:**

  - Build is successful

### 2. Implement in-memory type application (branch name: *feature/in-memory-app*)

**Prerequisites:**

<details><summary>Java</summary>
<p>

 - [Building a RESTful Web Service @spring.io](http://spring.io/guides/gs/rest-service)
 - [Building Java Projects with Gradle @spring.io](http://spring.io/guides/gs/gradle/)
 - [Spring Security Basic Authentication @baeldung.com](https://www.baeldung.com/spring-security-basic-authentication)

</p>
</details>

**Goal:**

 - Get all tests green while storing all the information in memory, list or any other suitable data structure can be used.

**Definition of Done:**

  - Build is successful

### 3. Implement database type application (branch name: *feature/adding-database*)

**Prerequisites:**

- Persist flight data in the database
- Keep possibility to run application in no-database mode

<details><summary>Java</summary>
<p>

 - [Accessing Data with JPA Service @spring.io](https://spring.io/guides/gs/accessing-data-jpa/)
 - [The persistence layer with spring data JPA @baeldung.com](https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa)
 - [Database initialization @docs.spring.io](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html)
 - [Docker](https://www.docker.com/get-started) installed on your machine
 - Subscribe to the [vladmihalcea.com](https://vladmihalcea.com/) newsletter
 - [Transaction configuration in Spring @baeldung.com](https://www.baeldung.com/transaction-configuration-with-jpa-and-spring)

**Goal:**

 - Persist flight data in the [PostgreSQL](https://www.postgresql.org/) database
 - Keep possibility to run application in no-database mode, this must be achieved through the configuration property: `flight-planner.store-type` with values `in-memory/database` 
 - Generate database schema with [Liquibase](https://www.liquibase.org/)
 - Cover repositories with an integration tests

**Running PostgreSQL locally:**

Run latest PostgreSQL locally in docker:

```docker run -p 5432:5432 -e POSTGRES_USER=codelex -e POSTGRES_PASSWORD=codelex -e POSTGRES_DB=flight_planner postgres```

**Generating schema with [Liquibase](https://www.liquibase.org/):**

There is good explanation about [Liquibase @baeldung.com](https://www.baeldung.com/liquibase-refactor-schema-of-java-app) make sure to read it through.

Our goal is to describe database schema in *xml* which will be read and executed by Liquibase.

**Testing database queries against real database:**

We can use [Testcontainers](https://www.testcontainers.org/) to test queries against the PostgreSQL in a docker container.
</p>
</details>

**Notes about the database schema:**

 - Use sequence for id generation
 - Properly apply foreign keys
    - Naming
    - Indexes must be present
 - Apply *non-null constraints* where applicable
 - Apply *unique constraints* where applicable

**Definition of Done:**

  - Build is successful
  - External tests are passing in *in-memory* & *database* mode
