# The Product Oriented Architecture

An argument for a different type of software architecture where all services are
built as hardened APIs that can be externalized to customers.  Talks about the
genesis of this concept at Amazon for what would become Amazon Web Services, its
application at new startups like [Twilio](http://www.twilio.com), and the
differences between it and SOA.

Given for Evan Korth's [ITP
Course](http://cs.nyu.edu/~itpwiki/wiki/index.php/Main_Page) in the Spring of 2012.

Revised for [Take Off Conference](http://www.takeoffconf.com), January 2013.

## Outline

- And now, a history lecture...
    - Back in 1995, Amazon.com launches selling books on the Internet
    - Jeff Bezos built a slow growth empire, a website that would grow to
      dominate online ecommerce
    - By 2001, Amazon's stock had split three times, sat at a market cap
      post-dot com bedshitting of nearly $2 billion, grown out of books into
      nearly everything you can buy at Wal-mart.
    - Driving that slow growth was one of the largest code bases
      deployed to one of the most complex Internet infrastructures on the
      planet.
    - The technical achievement here cannot be overstated.  Larry Page and
      Sergey Brin met each other at roughly the same time and started working on
      Google as when Amazon was founded.
    - In the same period of time, they were only dealing with a very difficult,
      but very specific Big Data problem.
    - By comparison, Amazon was dealing with Big Everything problems.
    - Big Inventory, Big Pipeline, Big Users, Big Persistence, Big Support, Big
      Payments
    - Google was the company known for scale, but Amazon's bottlenecks were far
      more numerous and complex.  There's no Map/Reduce for sending people ping
      pong paddles in a box.
- The Big Moment
    - Then in 2002, standing on top of a conquered space and finally turning a
      profit for the first time, Jeff Bezos sends an email.
    - [As the story
      goes](https://plus.google.com/112678702228711889851/posts/eVeouesvaVX),
      Bezos lays down a mess of mandates with huge technical implications for 
      Amazon's architecture.
        - All teams will henceforth expose their data and functionality through
          service interfaces.
        - Teams must communicate with each other through these interfaces.
        - There will be no other form of interprocess communication allowed: no
          direct linking, no direct reads of another team's data store, no
          shared-memory model, no back-doors whatsoever. The only communication
          allowed is via service interface calls over the network.
        - It doesn't matter what technology they use. HTTP, Corba, Pubsub,
          custom protocols -- doesn't matter. Bezos doesn't care.
        - All service interfaces, without exception, must be designed from the
          ground up to be externalizable. That is to say, the team must plan and
          design to be able to expose the interface to developers in the outside
          world. No exceptions.
        - Anyone who doesn't do this will be fired.
    - Think about it for a second.
        - Amazon was on top of the ecommerce world.
        - Already one of the top ten biggest websites on the planet.
        - Had largely solved most of the giant technical problems to make Amazon
          a viable business.
        - They were *finally* making money.
        - The CEO says no shared memory, no shared databases, and when you build
          something, it has to be exposed to the public goddamned Internet.
        - That's serious business.
- Flash Forward to Today
    - Amazon Web Services is miles ahead from any other infrastructure company
      out there.
    - And they are *pulling away*.
    - Still the only place you can go to for 1,000 new hosts in 15 minutes.
    - A huge offering of production-ready services from distributed file
      systems, in-memory caches, content delivery network, monitoring, email,
      DNS, and SMS
    - Created a whole new class of businesses as it eliminated the upfront cost
      of building a web service
    - Companies like foursquare, airbnb, 37 signals, Heroku, and a little outfit
      called Twilio
    - It has become so central to the modern web that when it is unavailable, it
      is a cultural phenomenon
    - And it all started with one edict handed down from one guy who knew what
      it would mean.
- Introduction
    - Bio
    - Twilio
        - Infrastructure is entirely in EC2
        - Over the past three years have gained a lot of practical experience over
          the cloud
        - We're one of the first API companies - a business oriented around the
          architectural strategy I'm going to describe
    - Product Oriented Architecture
        - You've all heard of Service Oriented Architecture
            - Seperate your business logic from your backend services. 
            - Idea here is to keep code specialized, independent and
              interoperable
            - Based on the primitive computer science model that made operating
              systems like Unix and suites like GNU Tools so successful
            - Do one thing, do it very well.
            - And from the fabric of those one things, weave a tapestry of awesome
        - Amazon Web Services shows the power of taking that idea one step further
        - It is one thing to build an API, it is another to build a product
        - Talk Outline
            - What differentiates a product from a service
            - How a productized API is different from a service
            - How difficult it is to make an API product
            - Why oriented your architecture around products makes a better codebase
- An API != Product
    - Services are easy to expose to people on your software project
        - You can always just import their code or used shared memory to get
          their objects
        - You can use datastores or message queues to share persistence and state
        - This is way, way, WAY faster and easier to implement
    - What does it take to make a service a product? 
        - Security
            - Secure authentication
            - Transport
            - Take into consideration the likely behavior of your customers
        - Fault Tolerance
            - Deal with the Internet flotsam (e.g. rate limiting / throttling)
            - Idempotence
            - Timeouts and retries
            - Instrumentation
        - Design
            - Changes will break code you don't control
            - Error reporting becomes critical - you are communicating with your
              users through the exceptions you write, not your stack.
            - Far more effort must be put into revision - refactoring becomes an
              external issue
- Benefits of an Product Oriented Architecture
    - Shit is hard to write
        - Way more complex than the CRUD pattern
        - Lot of wrong ways to do it (getters, setters)
        - Standards are not specified well (OAuth, REST)
    - Why do it?
        - Dramatically reduces shared state across the architecture
        - Services that are easy to implement get implemented more often
        - Services that are products run better on the cloud.
    - Shared state is shared disaster
        - Building services when they are meant to be products reduces state
          dependence across the architecture
        - Do one thing and do it well is easy to do in SOA, but when data is
          involved (and it often is) it becomes easier said than done.
        - Cruft starts to build in your models and other "easy outs"
            - You start getting crazy attributes in your data models like
              "order_status", "delivery_status", "transaction_status"
            - State starts to creep into session and other dirty places
        - The AWS Apocalypse story 
        - Data is always interrelated, but does not have to be interdependent
    - Services that are easy to implement get implemented more often
        - The day-to-day job of the working programmer is debugging code
        - A service that is difficult to implement will get engineered around
        - Silos will get created and work will end up duplicated
        - Product Oriented Architectures reduce the Overpass Syndrome, which reduces
          the total amount of effort required
    - Products run better in the cloud than services
        - The steps you take to hardern your service for users makes it more
          pliable for amorphous, ephemeral environments.
        - Throttles, rate limits, timeouts, state isolation - all these pieces
          that you do to make your product more usable for a consuming developer
          are simultaneously good for an environment where your hosts could go
          down at any moment.
        - Preparing for the unexpected from your users prepares you for the
          unexpected from your environment.
- Conclusions
    - SOA is one thing, but POA is another
    - The productized API design pattern is fundamentally stronger than the 
      service design pattern
    - Making services externalizable creates strong debt-free architectures
    - And, in the case of Amazon, this bold architectural choice created an
      entire additional business line that changed the way we work on the web.
