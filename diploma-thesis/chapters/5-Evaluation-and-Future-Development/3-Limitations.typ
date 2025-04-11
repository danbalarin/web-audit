== Limitations <limitations>

Although the application satisfies the functional and non-functional requirements, it has some limitations.
The most significant limitation discovered while using the application was the absence of naming URLs or audit runs.
This would simplify the comparison for the user, as currently, the only differentiation is the URL itself.

Another useful feature would be to show the difference between each column, not only between the first and the last.
This would help the user better understand the progress over time.

The last notable limitation is the time it takes to evaluate all the metrics.
Several implementation decisions cause this issue.
The biggest time delay is caused by the category modules running in series.
The only category that needs to run in an isolated manner is the performance; others could run in parallel.
The other limitation is that every runner is completely isolated, without the ability to share some context.
With some context sharing, some runners wouldn't have to perform requests on their own but rather evaluate data collected by other runners.