IdleServer
==========

A RESTful HTTP app to identify when a computer is used or idle.

1. The client runs on Windows and is built using .NET C#
2. The server is built with Java using the Jetty web server and servlet library and the Apache Commons IO library


Considerations
==============
Set up nginx as a proxy pass for the server and configure as much caching as you can get away with.
