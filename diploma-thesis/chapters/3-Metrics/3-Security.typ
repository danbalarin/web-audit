#import "../../template/lib.typ": abbr

== Security

As we stated in @security, security auditing has a lot to cover.
It's a field of its own; therefore, this thesis will focus on the basics and must-haves of a modern web application.

Because previously mentioned tools for security auditing can be viewed as intrusive without proper approval, we will develop a custom set of rules to cover the most critical areas.


=== Security Headers

The first piece of information we get from the web page are headers.
Those inform the browser how much content he can expect, what type of content and other information.
Among those are so-called _Security Headers_, headers responsible for specific security policies and settings.

#abbr.l("CSP") is a security standard designed to help web developers protect their applications from vulnerabilities like #abbr.l("XSS") and data injection attacks. 
It enables website owners to specify per-document policies that restrict the browser's ability to load or execute resources that aren't explicitly allowed.
By defining these policies, CSP helps mitigate risks by restricting script execution, controlling resource loading and preventing framing attacks. @zalewski_tangled_2011

Another important header preventing clickjacking and framing attacks is X-Frame-Options. 
In a clickjacking attack, an attacker crafts a malicious webpage that embeds the legitimate website within an invisible or transparent <iframe>. 
The attacker then overlays this iframe over an element on their page, such as a button or link. 
When the user clicks on what appears to be a harmless element on the attacker's page, they are actually interacting with the hidden legitimate site, potentially performing unwanted actions like changing settings, initiating transactions, or sharing sensitive information.
The X-Frame-Options header tells the browser how to handle the content when it is attempted to be loaded in a frame or iframe. 
By specifying this header, a website can control whether its pages can be embedded in other websites. 
This helps prevent clickjacking by disallowing unauthorised framing of the site's content.
The permitted values for this header are `DENY`, which disables displaying in iframe altogether, and `SAMEORIGIN`, which enables this behaviour only on the same origin.
A deprecated and not widely supported third option, `ALLOW-FROM <url>`, enables embedding from the specified origin.
@zalewski_tangled_2011

Another important header is #abbr.l("HSTS").
It's a web security policy mechanism that helps protect websites and users from protocol downgrade attacks and cookie hijacking. 
It ensures that browsers always establish secure connections to a website, thus preventing certain types of attacks that exploit unsecured #abbr.s("HTTP") connections.
Downgrade attack prevents server redirection to #abbr.s("HTTPS") when a user tries to access the web either without specifying protocol (so it defaults to HTTP) or by manually entering the unsecured protocol.
With this header in place, the website won't load and notify the user of a potential hazard.
This prevents attacks focusing on unencrypted communication, such as #abbr.a("MITM") attacks and cookie hijacking.
@zalewski_tangled_2011

=== Cookies

Cookies are often used as a carrier of authentication tokens or other authentication credentials.
Many attacks are then focused on cookies because if they can be stolen, it's easy for the attacker to impose as the original user and cause harm.

There are two main ways of stealing cookies, both of which can be prevented by properly setting the cookie flags.
The first type of attack is protocol downgrade.
Just as with #abbr.a("HSTS") policy, cookies can have `Secure` flag on, preventing their sending over unsecured communication channel, preventing #abbr.a("MITM") attacks.

The other attack vector is a Javascript script running in the user's browser.
By default, cookies are accessible via Javascript API for all scripts running in the browser.
Browsers compromised by malicious extensions, third-party software, or social engineering attacks can steal those cookies.
Flag `HttpOnly` prevents this, all cookies flagged with it are only sent with the requests, but cannot be read or written to via Javascript.
@zalewski_tangled_2011

=== Dependency security

One of the primary issues with dependency security is the presence of vulnerabilities in third-party code. 
Dependencies may harbour inherent security flaws or bugs that attackers can exploit. 
A vulnerability in a widely used library can have far-reaching consequences, affecting all applications that utilise it. 
For example, an outdated JavaScript library with an unresolved #abbr.a("XSS") vulnerability could enable attackers to inject malicious scripts into web applications that rely on it, potentially leading to data breaches or unauthorised access.

Some libraries may be compromised by the author and some by their own dependency.
Exploits are primarily found in older versions of libraries, and therefore, regular updating is crucial, but it doesn't fix the issue altogether.
This can be done via libraries and tools that evaluate application dependencies and their versions and compare the list to the list of known vulnerabilities.

In 2021 #abbr.a("OWASP") recognised outdated components as the top 6th security risks on the web, and based on the survey, it was the second most voted reason of security incidents.
@owasp_top_10_team_owasp_2021


=== Monitoring and logging

Monitoring tools provide continuous oversight of system activities, enabling the detection of unusual behaviours or anomalies that may indicate security threats. 
Real-time monitoring facilitates immediate responses to suspicious activities, such as unauthorised access attempts or data exfiltration efforts. 
This vigilance is crucial in minimising the window of opportunity for attackers and mitigating potential damages.

Logging tools, on the other hand, create detailed records of system events, user actions, and security incidents. 
These logs serve as invaluable resources for forensic analysis, helping security teams trace the origins of breaches and understand the methods used by attackers. 
Comprehensive logs also support compliance efforts by providing evidence of security practices and incident responses, which is essential in adhering to regulatory requirements.

Such tools can be detected by either checking for known libraries and requests to standard URLs used by those libraries or by checking the payload of requests for data that would indicate monitoring and logging, such as cursor and keyboard events, clicks outside of interactive elements, etc.
Although the presence does not guarantee that the website owner does some analytics with the data, it indicates that they are interested in user experience and security.
