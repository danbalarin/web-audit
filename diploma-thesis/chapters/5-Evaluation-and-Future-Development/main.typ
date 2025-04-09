
= Evaluation and Future Development

In this chapter, we will confirm whether the requirements were met.
The non-functional requirements include ease of setup, locally running application and extensibility.

Ease of setup is subjective to the user.
Currently, the solution with a docker container is viable for technically savvy users.
It could be further simplified by having it packaged and distributed via installers for each operating system, but this solution is a compromise between ease of setup and complexity of build and distribution.
We can say that this requirement was met, with possible improvements that could be made.

The application is locally running and is extensible.
The extensibility was achieved by a modular system already discussed in the previous chapter, so these requirements were also met.

The functional requirements include the ability to conduct audits, compare results and remove projects and audits.
To check the conducting of audits and the comparison of the results, the best option would be to find a website that has two versions, older and newer.
This scenario happens most often when a company is re-branding or is doing a major rewrite of the website.
Unfortunately, the onboarding of the users to the new version is most often done gradually, with the owner controlling what user sees what version.

This means there is no way of conducting tests on a live website that could be repeated in the future.
Another alternative is an open-source application which has an older version as well as a new one.
However, since open-source projects rarely undergo re-branding or major rewrites due to community recognition and backwards compatibility, it's not trivial to find a good candidate.

Another option is to create a custom testing environment that simulates real-world application, make changes and observe the difference.
This way, we will also have finer control over the application, and we can make changes with predicted expectations.

#include "1-Environment-Preparation.typ"

#include "2-Evaluation.typ"

#include "3-Limitations.typ"

#include "4-Future-Development.typ"