#import "/template/macros.typ": revisit

== Stability

#revisit[
  Stability is hard to test blackboxed, but we can still do some checks.
  Main thing to look out for is 5xx error page, which in ideal scenario should never be seen.
  But that is rather chance based, the only fully deterministic thing we can check for is presence of error tracking (like sentry.io).
  We can also check for health endpoints, but if it's not going to be put on `GET /api/health`, there is little to no chance of actually finding it.
]

=== Motivation

#revisit[
  TODO
]

=== Areas to be considered

#revisit[
  TODO
]
