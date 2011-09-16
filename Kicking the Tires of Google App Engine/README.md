Kicking the Tires of Google App Engine
============================

A 45 minute introduction to Google App Engine.  Focusing on Python, this survey of Google's foray into the
cloud business introduces developers to the benefits and detriments of the service, discusses recent changes
that have great implications to app costs, and reviews code for the webapp, Datastore, Task, and Channel APIs.  


Outline
---------------------------

- Introduction
    - Faust
    - Introduce Speaker
        - Bio
        - GAE experience
            - Not a Googler or a Google partner, just a customer
            - Not a huge customer - only seven apps, three in production
            - Showed up for Channels API - mid-2010
            - Twilio released a GAE product - Stashboard
        - Other qualifications
            - Customer of AWS, Rackspace Cloud (SliceHost) and dotCloud collectively five years
            - Seven year sysadmin and network engineer - 8M uniques a month
            - Longtime Pythonista frustrated with hosting options for the independent developer
    - Introduce Talk
        - Not a sales pitch - plenty good, plenty bad things to say
        - Not an overview - Guido van Rossum already did it, and how the hell can I top that?
        - Pragmatic introduction - a test drive focused on educating the Python developer on GAE
- Overview
	- Description
	    - Foray into the cloud business, but not a cloud service
	    - Platform-as-a-service (PaaS) is infrastructure with a framework
	    - A cognizant tradeoff of control for convenience
	- History
	    - Started in 2008
	    - 100k developers, 200k apps, 1.5 billion page views daily
	    - Was in "preview" for three years, now in "beta."
	- Context
	    - Late to the game compared to Amazon, as everyone was.
	    - Predated Heroku and Engine Yards "push-button" deployment - pioneered that space
	    - One of the first to embrace WSGI
- Perspective
    - Benefits
        - Easy web deployment option for Pythonistas currently available
        - Zero friction admin experience (but no CLI)
        - Only way you can run on Big Table, the largest scale NoSQL implementation on the Internet
        - WSGI - more on that in a bit
    - Detriments
        - Read only file system access - all data must be in Datastore or Blobstore
        - Python 2.5 - Back to the Future
        - 30 second execution time - hard cutoff on all operations
        - Not super fast
        - Uber vendor lock-in - you're getting in bed with Google with a GAE app
    - New Developments
        - Price hike - free tier is drastically lower than it was, prices substantially higher than they were
        - New features - Go, Memcache, Backends (continuously running instances, like Tornado or Twisted)
        - Python 2.7 in November
- Getting Setup
    - Install Google App Engine SDK
        - Download off Google Code
        - Executables for Windows/Mac, straight directory for Linux
        - GUI for starting stopping dev server, command line for Linux
    - Install Python 2.5 - use deadsnakes PPA on Ubuntu
    - Optional: Install virtualenv to keep segregated from your main install
        
- APIs
    - Webapp
        - Show project structure with app.yaml
        - Launch GAE Dev Server
        
        ```
        python2.5 /usr/local/google_appengine/dev_appserver.py application_name
        ```
        
     	- Demonstrate how WSGIHandler dishes out routes.
     	
     	```python
     	from google.appengine.ext.webapp.util import run_wsgi_app
     	
     	application = webapp.WSGIApplication(
                                     [('/', MainPage),
                                      ('/pennapps', PennApps)],
                                     debug=True)

		def main():
		  run_wsgi_app(application)
		
		if __name__ == "__main__":
		  main()
     	```
     	
     	- Add a new Web Handler class
     	```python
     	class PennApps(webapp.RequestHandler):
        	def get(self):
                self.response.headers['Content-Type'] = 'text/html'
                self.response.out.write('<h1>PENN RULES!</h1>')
     	```

    - Datastore
    	- Show models
    	
    	```python
    	class Greeting(db.Model):
		  author = db.UserProperty()
		  content = db.StringProperty(multiline=True)
		  date = db.DateTimeProperty(auto_now_add=True)
    	```
    	- Show GQL Query
    	
    	```python
    	greetings = db.GqlQuery("SELECT * FROM Greeting ORDER BY date DESC LIMIT 10")
    	```
    	
    	- Show Query object    
    	
    	```python
    	greetings_query = Greeting().all().order('-date')
    	greetings = greetings_query.fetch(10)
    	```
             
    - Testing
        - You can use unittest or nose.
        - Does not come with a web client (a la Django).  Use webtest instead.
        - GAEUnit can beautify these for GAE, but is pretty janky and is no longer maintained.
        
    - Other Features
    	- Users - Super easy to use gmail sign on
    	
    	```python
    	from google.appengine.api import users
		from google.appengine.ext import webapp
		from google.appengine.ext.webapp.util import run_wsgi_app

		class MainPage(webapp.RequestHandler):
		  def get(self):
		    user = users.get_current_user()
		
		    if user:
		      self.response.headers['Content-Type'] = 'text/plain'
		      self.response.out.write('Hello, ' + user.nickname())
		    else:
		      self.redirect(users.create_login_url(self.request.uri))
		```
    	- OAuth - create an Oauth service provider nearly as early as using as Google users
    	
    	```python
    	from google.appengine.api import oauth

        try:
            # Get the db.User that represents the user on whose behalf the
            # consumer is making this request.
            user = oauth.get_current_user()

        except oauth.OAuthRequestError, e:
            # The request was not a valid OAuth request.
            # ...
    	```
    	
    	- Channels - message bus you can us in JS, now with Presence
    	- Tasks - there is a Task Queuer where you can launch async code blocks with Push and Pull


    	
- Conclusions
    - Caveat emptor
        - Leaving GAE will mean major refactoring
        - Costs are going to be difficult to predict in the near term
        - The big disaster awaits - major outage, shareholder spinoff, Google loses interest in the business
    - Eminently Useful
        - You can build powerful apps very, very quickly
        - Pythonistas don't have a more friendly alternative
        - Alternatives do exist to evade lock-in
    - The Faustian Bargain (a.k.a. Recommended Uses)
        - Pretty awesome at first - best Python host currently available for small projects where time to market is greatest concern
        - Shine can wear off quickly - good web host for small projects with limited scope
        - Endgame is dire - should be avoided for a real company


Documenation and Important Links
-----------------------------

* [Dashboard](https://appengine.google.com/)
* [Getting Started with Python](http://code.google.com/appengine/docs/python/gettingstarted/)
* [Python Reference Docs](http://code.google.com/appengine/docs/python/overview.html)
* [Blog](http://googleappengine.blogspot.com/)
* [Status](http://code.google.com/status/appengine)
* [Introduction to Google App Engine by Guido van Rossum](http://www.stanford.edu/class/ee380/Abstracts/081105.html) 


References
----------------------------

* [What is Google App Engine?](http://code.google.com/appengine/docs/whatisgoogleappengine.html)
* [Wikipedia](http://en.wikipedia.org/wiki/Google_App_Engine)
* [Find the Best Comparison of AWS, Azure and GAE](http://cloud-computing.findthebest.com/compare/5-15-17/Amazon-EC2-vs-Google-App-Engine-vs-Microsoft-Windows-Azure)
* [Google App Engine Price Hike Stuns Developers](http://www.informationweek.com/articles/231600672)
* [Has Google Done Enough To Mollify Users of App Engine](http://www.i-programmer.info/news/141-cloud-computing/3047-price-change-for-app-engine.html)
* [Using virtualenv with Google App Engine](http://schettino72.wordpress.com/tag/virtualenv/)