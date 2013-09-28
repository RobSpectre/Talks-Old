## Getting Started with APIs

A primer on web-based APIs for the uninitiated.  Aims to give the audience an
overview of some handy hackathon APIs and toolsets for fast integration.

Given at [hackNY](http://www.hackny.org) Fall 2013 Hackathon.

## Outline

- Intro
- Agenda
    - Common Concepts
    - API Landscape 
    - Useful Tools
    - Questions
- Common Concepts
    - API / REST
        - APIs are not new - they are everywhere.
        - Your language has an API, your framework has an API, anytime you are
          interacting with someone else's code, you are using an API.
        - Colloquially come to be referred to as a host of hosted web services
          that you can extend to add some useful service or content to your app.
        - Most popular design pattern currently is REST
        - Popular examples
            - New York Times
            - Tumblr
            - Etsy
            - Twilio
    - Webhook / RESThooks
        - Notifies your app when something has happened on another service
        - Can be thought of as the inverse of a REST API - they make HTTP calls
          to a url you specify when something occurs
        - When you hear "Push API", this is usually what this means.
        - Popular examples
            - Foursquare
            - Sendgrid
            - Twilio
    - Streaming
        - Opens a connection and gives you serial data as it happens.
        - When you hear "realtime", this is usually what this means.
        - Requires a "worker" to always be running
        - The best ones have native helper libraries that do this for you
        - Popular examples
            - Twitter
            - Pusher
    - XML / JSON
        - Structured data in another system needs to become a native data object
          for you to work with it.
        - Serialization formats are commonly used to pass this data over HTTP
        - Two most popular are XML and JSON
        - Implementations are usually easiest with JSON and available in your
          standard library
        - Good XML Parsers
            - Python: BeautifulSoup
            - PHP: SimpleXML
            - Ruby: Nokogiri
            - node.js: xml2js
- API Landscape 
    - Twilio
    - SendGrid
    - Pusher
    - Opento
    - Echo Nest
    - Google Maps
    - Mashery
- Useful Tools
    - Don't use the standard lib
        - Nearly every HTTP client in the standard libraries of major
          programming languages was written by a developer who has never worked
          on the web.
        - If you are doing anything other than calling a GET or a POST method,
          there is likely an easier way.
    - Plan B: HTTP Client libraries 
        - Python: Requests.
        - .NET: RestSharp
        - Ruby: HTTParty
        - PHP: Guzzle
        - Java: Google HTTP Client
        - Javascript: jQuery
    - Frameworks
        - Users
            - Python: Django
            - Ruby: Rails
            - PHP: Yii, Symfony
            - Java: Play
            - .NET: MVC.NET
        - No Users
            - Python: Flask
            - Ruby: Sinatra
            - PHP: Laravel
            - Java: Spark
            - Node: Express
        - Robust plugin support
            - Oauth in particular
            - If you are working with Facebook and Twitter, these are must-haves
              for 24 hour projects
    - Integration Tools
        - Ngrok
        - Postman
        - Requestbin / Runscope
        - Charles
    - Design Tools
        - Foundation
        - InK
        - Bourbon Neat
    - Deploy Tools
        - Heroku / Nodejitsu
            - Fastest way to get something on the internet.
            - Heroku has support for Ruby, Python, Java and Node (but no
              websockets)
            - Nodejitsu has websocket support - important for socket.io.
        - Google App Engine
            - Has a *lot* of shit built in - generous free tier
            - You have to use their framework.  This code can't be hosted
              anywhere else.
        - Parse / Firebase
            - Mobile dev is very time consuming - writing both client and server
              can be beyond reach in 24 hours.
            - There are a number of "Backend as a Service" providers that ease
              this pain.
            - Parse works well with both iOS and Android as well as client JS
              MVCs like Ember and Angular
            - Firebase has great realtime tools
- Questions
