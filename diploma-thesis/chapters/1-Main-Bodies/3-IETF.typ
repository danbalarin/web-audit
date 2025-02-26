#import "../../template/lib.typ": abbr

== Internet Engineering Task Force <IETF>

The #abbr.l("IETF") is a premier international standards organisation responsible for the development and promotion of voluntary internet standards, particularly those of the Internet Protocol Suite (#abbr.s("TCP")/#abbr.s("IP")).

As stated by #cite(<alvestrand_mission_2004>, form: "prose") in the Mission Statement for IETF, their mission is to make the Internet work better by producing high-quality, relevant technical documents that influence the way people design, use, and manage the Internet. 
The IETF is dedicated to the development of robust, secure, and scalable protocols and technologies that form the backbone of the Internet. 
Its primary objectives include fostering technical excellence, facilitating the exchange of technical information, and creating a platform for collaboration among experts worldwide.

The Internet Engineering Task Force (IETF) has played a crucial role in developing a wide array of standards and protocols that constitute the technical bedrock of the Internet. 
The most significant include #abbr.a("DNS"), #abbr.l("TCP"), #abbr.l("IP"), #abbr.a("HTTP"), #abbr.a("TLS") and #abbr.a("IPsec").

In this thesis, we will focus primarily on HTTP and TLS because those are crucial for the good performance and security of websites.
As the backbone of data communication on the World Wide Web, HTTP allows web browsers and servers to communicate and exchange information efficiently. 
The IETF has continuously evolved this protocol, introducing versions like HTTP/2 and HTTP/3. 
These newer versions enhance performance, security, and efficiency by implementing features such as multiplexing, header compression, and reduced latency, thereby improving the overall user experience on the web.
@gourley_http_2002

#abbr.a("TLS") and #abbr.a("IPsec") are protocols developed to provide encryption and secure network communication.
TLS, widely used to secure web traffic, ensures privacy and data integrity between communicating applications by encrypting the data transmitted. 
IPsec adds security features at the IP layer, allowing for secure tunnelling and authentication of data packets. 
These protocols protect sensitive information, maintain user privacy, and establish trust in online transactions and communications.

The IETF also publishes #abbr.a("BCP") documents, which provide recommendations for operational procedures and administrative processes. 
These documents address a wide range of topics, including network configuration, email handling, security policies, and protocol usage guidelines. 
BCPs are instrumental in promoting consistency and excellence in Internet operations.

For example, BCP documents offer guidance on mitigating #abbr.a("DDoS") attacks, implementing anti-spam measures, and deploying IPv6. 
By adopting these best practices, network operators and developers can reduce vulnerabilities, improve user experience, and contribute to the overall health of the Internet infrastructure.
@senie_network_2000





