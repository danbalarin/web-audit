#import "/template/macros.typ": revisit

== Security

#revisit[
  The most critical section of them all, since it's not about comfort and ease of access but rather about sensitive data.
]

=== Motivation

#revisit[
  Handling sensitive and private info isn't easy, especially when there is a lot of bad guys trying to get it.
  There is a lot of attack types, from impersonation, to gaining control over the system.
  Security leaks are very serious and often ends with huge fines and lost trust of customers.
]

=== Areas to be considered

#revisit[
  - Used HTTPS, forced HTTPS (WSS for web sockets)
  	- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - iFrames shouldn't be used unless necessary
  - Disable unused JS APIs via header
  	- `Feature-Policy: accelerometer 'none'; ambient-light-sensor 'none'; autoplay 'none'; camera 'none'; encrypted-media 'none'; fullscreen 'self'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; picture-in-picture 'none'; speaker 'none'; sync-xhr 'none'; usb 'none'; vr 'none';`
  	- or
  	- `Permissions-Policy: accelerometer=(), ambient-light-sensor=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker=(), sync-xhr=(), usb=(), vr=();`
  - %% According to MDN it shouldn't be used %%
  - %% Enabled XSS protection %%
  	%% - `X-XSS-Protection: 1; mode=block` %%
  - User input should be sanitised and properly escaped
  	- This is prevention to XSS attacks, rule of thumb is that user shouldn't be able to store on server data that contains special characters like `<`,`>`,`\`, etc. (There are some exceptions, like rich text fields)
  - Strong Content Security Policy headers
  	- `Content-Security-Policy: default-src 'none'; script-src 'self'; img-src 'self'; style-src 'self'; connect-src 'self';`
]

#revisit[
  - Client secrets should be stored in `HttpOnly` Cookie only
  	- Cookie should be scoped only to domain and perhaps path
  	- Local storage should contain only non sensitive data, like selected color scheme
  	- Session storage should contain only non sensitive data that are viable only per session
  - On pages where email is not used for login you shouldn't disclose full email address on pages like password reset
  - API should be at the same domain, if not proper CORS headers must be present
  	- Allow all CORS header is not proper solution
  	- From technical viewpoint this can be just a simple proxy
  - Incremental IDs (`/api/post/1`) is bad
  - CSRF token
  - CAPTCHA on login/register/password reset
  - Auth as a separate application is nice to have
]
