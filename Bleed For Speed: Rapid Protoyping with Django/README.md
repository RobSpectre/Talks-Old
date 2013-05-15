# Bleed for Speed: Rapid Prototyping with Django

A summary of tips and tricks I've picked up from four years of active
hackathoning using the [Django](https://www.djangoproject.com/) web
framework for Python.

## Outline

- The Battle of Mobile Bay
- Intro
    - Bio
    - Django experience
    - Agenda
        - Why Django for prototyping?
        - Environment setup
        - Project setup
        - Testing
        - My Favorite Reusable Apps
- What is rapid prototyping?
    - Prototypes are sketches in code
    - More useful than mockups because you compel key UX and 
    - With something like Django, very fast.
- Why Django?
    - Why not insert-framework-of-choice?
    - It was built for this.
        - Django's conception in a newsroom makes it uniquely suited for
          time-sensitive prototyping
        - Runs a near perfect balance as a prototyping framework between
          batteries included and flexibility
    - It was built to bend
        - Model-View-Whatevah - wherever you are coming from, it makes sense.
        - manage.py handles brain damage setup
        - Flexibility around where the url dispatcher lives
        - Users, admin interface, diverse datastore support without magical
          Asset Pipelines or template naming prescriptions.
        - Django is the pizza everyone can eat.
    - It was built by you
        - Django's biggest strength is the community around it.
        - Enormous wealth of reusable apps
        - Strong leadership
- Environment Setup
    - Development
        - Starter Projects
            - Danny and Audrey's Two Scoops project
                - Chapter 2 of their book goes over the optimal environment
                  setup
                - So optimal in fact, they generously make it available as a
                  [github
                  repo](https://github.com/twoscoops/django-twoscoops-project).
                - One bit I would add is a Procfile and Makefile.  Foreman is a
                  gem, I know, but it is ridiculously useful.
            - [playdoh](https://github.com/mozilla/playdoh) by Mozilla
                - All the things included.
                - Secure by default - SHA-512 pass hashing, secure cookies,
                  bleach and django-session-csrf built-in
                - Some cons: based on Django 1.3, jinja2 templating.
        - Static files
            - Just use django.contrib.staticfiles
            - FileSystemFinder
            - AppDirectoriesFinder
            - Add ./manage.py collectstatic to your Makefile
    - Deployment
        - Heroku - cheap, fast and easy.  Hard to justify any devops time on a
          prototype, even harder actual developer time.
        - Manuel Franco's [Chef
          recipe](https://github.com/maigfrga/chef-django-ubuntu)
        - Barry Morrison's [Salt
          States for fully featured Django stack](https://github.com/esacteksab/salt-states)
- My Favorite Reusable Apps and Other Tricks
    - RESTful API
        - tastypie
            - Pros
                - Fastest path from model definition to CRUD endpoint
                - Well tested, easy to contribute
                - HATEOAS by default
                - Daniel Lindsley is a nice guy
            - Cons
                - These are not Django views
                - Tightly coupled
                - Difficult to customize
        - django-rest-framework
            - Pros
                - More flexible
                - All resources are web browsable
                - Tom Christie is a nice guy
            - Cons
                - Not as fast to implement as tastypie
    - OAuth Authentication
        - This is a rat's nest when you get into it the first time
            - Even more reusable apps than ones for creating RESTful APIs.
            - A not-even-comprehensive list:
                - django-social-login
                - django-socialprofile
                - django-socialregistration
                - django-connect
                - django-le-social
                - django-socialauth
                - django-social-auth
        - Two ones I prefer for different reasons
            - django-social-auth
                - Plugin architecture produced community contributions for
                  nearly every service you would want
                - Custom User Models
                - Multiple services attached to one user
            - django-allauth
                - Also supports Custom User Models
                - Less popular on Github, but remains actively maintained
                - Just works - fastest to drop and go
    - South
        - Hey it's great.
        - If you weren't here yesterday for Andrew's talk, railer.
    - Celery
        - Access to a high quality task queue is a unique advantage to Django
          (and indeed Python).
        - Setup is a bear, but it is a very useful tool in your fanny pack when
          it comes prototyping time.
        - Tips on Easing The Pain
            - Remember Chef?  [Good recipe for
              Celery](https://github.com/needle-cookbooks/chef-celery) too.
            - django-celery will let you use the db as the message queue,
              reducing dev / deploy complexity
            - Heroku does have a Celery add-on, but you're going to want to get
              good at this.
    - 
    - AngularJS 
