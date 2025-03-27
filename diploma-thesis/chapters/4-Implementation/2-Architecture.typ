#import "../../template/lib.typ": abbr

== Architecture

Based on functional and non-functional requirements, we can determine the platform, extensibility points, and other architectural considerations.

=== Platform

There are several platforms to choose from, including mobile, web, and desktop.
Mobile is not well-suited for this application as it cannot efficiently handle large numbers of requests, perform heavy computation, or maintain a stable connection to ensure all metrics can be successfully measured.

Desktop and web each have advantages and disadvantages.
Desktop applications are better optimised for computation-intensive tasks, can handle requests more efficiently, and offer better options for concurrency. 
However, they are more difficult to distribute across multiple operating systems. 
Web applications are easily distributable and can run in any environment regardless of operating system. 
The web also benefits from existing solutions for some metrics we will measure, making implementation more straightforward and reliable due to community support.

For these reasons, we will implement a web application. 
This choice introduces an additional challenge: some metrics cannot be measured on the front-end side of the application, requiring a back-end to be in place. 
This requirement complicates the distribution of a locally running application, but this can be addressed through containerisation. 
We can still provide a one-click solution using Docker or a similar containerisation solution, provided the user has a containerisation service installed.

This approach also creates an opportunity to deploy the website for easy internet access. 
However, this is beyond the scope of this thesis, as it would require additional complexity in handling user credentials, and performance metrics would not be reliably measured.

=== Technology

According to a Stack Overflow survey (#cite(<stack_overflow_technology_2024>, form: "year")), the most popular and used web framework is Node.js together with React.
As this application will be open-sourced, it would benefit greatly from a larger community that can extend it beyond this thesis. 
Another reason to choose Node.js over alternatives like Flask or Spring Boot is the ecosystem of existing solutions for some metrics. 
Although these solutions could be used within other environments, it would add unnecessary complexity.
 
Therefore, we will use Next.js, the top-rated framework in the Node.js environment. 
It offers front-end and back-end capabilities within a single application, making it easier to share data types between them. 
It also provides features like routing, optimisations, static asset creation, and development environment setup out of the box, without additional configuration. 
Other popular solutions in the React ecosystem offer some of these features but not all.

=== API Protocol

Another important aspect of any website is the communication protocol between front-end and back-end.
The main options are #abbr.a("REST"), GraphQL and #abbr.a("RPC").

REST was originally a solution for transporting states between systems.
It defines how resources can be created, updated, deleted, and read, as a list or in detail.
Compared to the other solutions, it is difficult to ensure type safety, which can lead to unexpected runtime errors.

GraphQL, unlike REST, is not a paradigm for resource manipulation but a query language, comparable to #abbr.a("SQL").
It improves type safety compared to REST. 
However, developers still need to rely on additional type generation scripts, and data is not validated by default on either the back-end or front-end.

RPC offers many benefits, including strong type safety with validation on both back-end and front-end, meaning runtime errors occur at the API layer rather than deeper in the application, improving debugging speed. 
The main advantage of RPC for applications like this thesis is its different paradigm. 
While REST and GraphQL primarily focus on resources, RPC focuses on remote procedures. 
For this application, it means we can directly call procedures that start audits rather than creating resources that would trigger audits as side effects.
For this reason, we will use the tRPC package, an RPC implementation in TypeScript that offers type safety in a Node.js environment.

=== Database Schema

The database schema for this application is relatively simple. 
Since the application is designed to run locally, there is no need for authentication or assigning different projects to different users.

As shown in @db-schema, the database contains several tables connected through one-to-many relationships. 
Each table has its own ID, the ID of the table it relates to, and three timestamps indicating when it was created, last updated, and soft deleted.

The job and metric tables contain JSON data types for storing unstructured data within a structured database. 
This functionality is natively supported by PostgreSQL, the database used for this application. 
This approach allows metrics and jobs to store arbitrary data, making the system more extensible.

#figure(
  caption: "Database schema",
  placement: auto,
  image("images/db-schema.png"),
) <db-schema>


=== Modularity

For an application of this scope, proper separation into smaller components is essential for readability and maintainability. 
One of our non-functional requirements is for categories to be extensible to accommodate future changes in metrics.

This creates a natural separation point where each category can be its own module. 
By defining a common interface, we can plug these categories into the main application, separating concerns and encapsulating them in separate modules. 
This approach makes it easier to add new categories without major changes to the main application, enhancing extensibility.
It also means that any changes to the existing categories is isolated and potential bugs won't affect other modules.

Another module that can be separated is the database connection. 
As the database needs to be deployable, it must define migration scripts that initialise database tables for the application to function properly. 
This effectively separates the application into a layered architecture, with the database module containing connections and repositories, the modules containing the business layer, and the main application containing the presentation layer.

#figure(image("images/layered.png"), caption: [Layered architecture pattern @richards_software_2022])

The final module to separate is an API module, which will contain all common interfaces. This separation allows every other module to depend on it without creating cyclic dependencies.
This module can also contain utility functions that can be reused in category modules or in the main application.

To further improve the separation of concerns, we can divide each module into runners that audit only similar metrics. 
For example, the security module might scan response headers, check SSL certificates, and identify vulnerable dependencies. 
By splitting it this way, we can encapsulate similar metrics, making it more readable and extensible.
Simplified module and runner interfaces can be seen in @module-interface and @runner-interface.

#figure(
  caption: "Module interface", 
  supplement: "Code", 
  kind: "code", 
  [
    ```ts
    abstract class BaseModule extends EventEmitter {
      protected runners = BaseRunner[]

      constructor(runners: BaseRunner[]) {
        this.runners = runners;
      }

      // Executes every runner in parallel
      protected async _execute(context: TContext): Promise<ModuleResult> {}
    
      // Starts emitting progress, handles errors and invokes _execute
      async execute(context: TContext) {}}
    
      // Metadata about the module
      get id() {}
      get name() {}
      get description() {}
      get version() {}
    }
    ```
  ]
) <module-interface>

#figure(
  caption: "Runner interface", 
  supplement: "Code", 
  kind: "code", 
  [
    ```ts
    abstract class BaseRunner {
      public name: string;
    
      constructor(name: string) {
        this.name = name;
      }
    
      // External API, it invokes the runRaw and then transforms the data
      abstract run(context: TContext): Promise<MetricResult[]>;
    
      // Collects all info needed for the metrics
      protected abstract runRaw(context: TContext): Promise<TResult>;
    
      // Transforms raw data into metric values
      protected abstract transform(result: TResult): Promise<MetricResult[]>;
    }
    ```
  ]
) <runner-interface>

// TODO: check for unnecessary empty page

#pagebreak(weak: true)



