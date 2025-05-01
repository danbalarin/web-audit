#import "../../template/lib.typ": abbr

== Technical Realisation

Having established the architectural foundation and key design decisions, this section delves into the concrete development aspects of the application. 
The technical realisation encompasses the practical aspects of transforming architectural concepts into functioning code.

=== Module Processor

This class, located in the API module, is responsible for the orchestration of the whole data gathering, processing, and evaluation.
As already mentioned, metric evaluation is done by runners (@runner-interface), which are controlled by modules (@module-interface).
These modules are event emitters—objects that emit events when something happens.
They emit progress, error, and done events, indicating different states they can be in, together with payload.

Module processor initiates these modules one by one and updates the entries in the database, from which the front-end can get updates through the API.
Modules are initiated one by one to prevent interference, which is critical in the performance metrics.
On the other hand, runners in the modules can be run in parallel and series, as not all modules are sensitive to other tests being run.

This class can conduct only one audit, as it is meant to be instantiated for every audit run.
Multiple module processors are instantiated and run in series for audits on various URLs for the same reason mentioned above.

=== Metrics Collection

Data for each metric are collected in every runner separately.
This means there is a higher load on the targeted websites, but not all metrics can be evaluated from the standard set of information that can be generally collected.
Lighthouse does prevent this by being split into gatherers, which gather data, and processors, which then process and interpret the raw data.

The benefit of this is that the server doesn't have to send as many requests, making it more efficient for both the application and the target website.
The downside is that it reduces the flexibility and extensibility of a system that evaluates several categories.
Having many hooks or plugins on every request could also interfere with performance metrics, and further restrictions would have to be made, making the system even more complex.

=== Knowledge Base

The knowledge base must display text in various sizes, include links, and embed images. 
Markdown, a lightweight markup language, offers the simplest solution for this requirement, supporting headings, text formatting variations, and image embedding. 
It can also be extended for tables or other types of content.

Beyond standard Markdown features, we implemented one extension: internal links. This addition allows metrics to reference other metrics, providing users with easy navigation without searching through the knowledge base menu.

Implementation of this feature was done by extending the link component with a custom rule. 
The application evaluates each link target, and if it matches the pattern `category:<category_name>,metric:<metric_name>`, it generates a valid URL link. 
The metric portion is optional, allowing references to entire categories rather than specific metrics when needed.

Since metrics are organised into separate modules, we co-locate markdown files with their corresponding metric definitions, which are then exposed through document lists. 
This structure allows metric descriptions to exist within their own modules rather than in the main application where the knowledge base resides.

=== Deployment

The deployment strategy is crucial as it directly impacts the complexity of distribution to end users. 
For this reason, the most popular containerisation provider, Docker, is selected.
According to a survey by #cite(<6sense_best_2025>, form: "prose"), Docker has an impressive 87% market share in the industry.

The Docker image is constructed through multiple phases in what is known as a multi-stage build process @jones_mastering_2024. 
This approach significantly enhances build efficiency, as the Docker engine can more effectively cache layers and parallelise workloads. 
Additionally, it substantially reduces the final image size by excluding build-only dependencies from the runtime environment, ensuring only necessary components are included in the final container.

In order to build the app locally, the user has to first download the application source code listed in @source_code.
After the code has been fetched, the environment variables needs to be provided.
Those can be provided by creating `.env` file, that provides information for database connection.
The structure can be found int the `.env.sample` file located in the repository. When the variables are provided, the `docker-compose up` command can be run.
This builds the application, creates the container and runs it together with PostgreSQL database with provided credentials in the `.env` file.
