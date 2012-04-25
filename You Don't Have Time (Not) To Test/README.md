# You Don't Have Time (Not) To Test

A talk advocating for novice developers to learn automated testing early in
their programming education.

Given at [Hacking for Hustlers
#4](http://www.meetup.com/Hacking-for-Hustlers/events/60823502/), April 2012.


## Outline

- Intro
    - You've taken the plunge - this is your Code Year
    - You've decided to stop pining for the technical co-founder that never
      comes and start creating a prototype yourself
    - You're neck deep in [Rails Tutorial](http://ruby.railstutorial.org/) or
      [Learn Python the Hard Way](http://learnpythonthehardway.org/).
    - You've rolled up your sleeves to get it done - JFDI is your mantra.
    - You have a basic Rails (or even better Django) app running
    - The slog is starting to begin
        - This is the second big hump after Hello World
        - You have something useful happening, but you're getting aggravated by
          simple issues
        - Your function size is starting to grow - opportunities for stuff to
          break are increasing
        - You're wasting whole weekends on two or three problems
        - Iteration is starting to grind to a halt
    - You have to get this out, but small mistakes are wasting big chunks of
      time.
    - At this point, you need a saviour - and that saviour is testing
    - Automated testing is writing code that tests your code *programatically*
        - It replaces a spreadsheet of manual processes to make sure all that
          you created works as expected
        - It tests pieces automatically for all imagined conditions (e.g. is 
          the user logged in here, is the user not logged in here)
        - It does it way faster than a human ever could.
    - Automated testing is the saviour for novice developers because it provides
      the greatest return on investment of time for programmers who have gotten
      past Hello World.
    - Introduction
        - Bio
        - Why you should learn to test when you're new to learning code
        - A real example of what testing code is
        - What you should realistically expect to learn at this stage
        - Some helpers to get you testing your code tonight
- Caveats
    - This is a controversial view
    - There are some in the startup world who eschew tests altogether
    - You *will* receive advice suggesting not to bother
    - There are professional programmers who go their whole careers without
      writing any tests at all :/
    - I didn't learn the values of automated testing until late in my
      development career
    - I wish I had learned it sooner.
    - I'm going to lay out an argument why I feel this is something novice
      developers can benefit from.
- Why Learn to Test When You're a n00b
    - One of the best ROIs in learning to program
        - Your objective when learning to code to stay unstuck as long as
          possible
        - Just like running the first mile is the hardest, overcoming a single
          problem is where most developers get stuck
        - When learning to program, you're going to make the same mistakes over
          and over.
        - Learning to write automated tests reduces two important things
            - The number of times you get stuck
            - The number of repeat mistakes you make
        - The reduction of these two elements alone produces the net profit of
          time invested against time saved.
    - It forces you to specify your product.
        - Automated tests == user stories
        - "When a user is logged in clicks on his/her profile, he/she should see
          a thumbnail, his/her name and two boxes to change and verify his/her
          password."
        - Detailing your product in this way
    - It elevates your chances of attracting quality technical talent
        - Learning to code puts you ahead of 99% of the entrepreneurs you are
          competing with for technical talent.
        - Learning to test your code puts you ahead of 99% of that 1%
        - Increases the likelihood that more of the code you write now will end
          up in the "real" product.
        - Gives the technical team members you recruit greater confidence to
          code quickly.
- What is Testing
    - Python Live Coding Example
        - Let's do a quick Python app and test it - example.py

            ```python
            import flask
            import os

            app = flask.Flask(__name__)

            @app.route('/')
            def index():
                return "Hello world!"

            if __name__ == "__main__":
                app.run(host='0.0.0.0', 5000)
            ```

        - How do we write a test for it? test_example.py

            ```python
            import unittest
            from example import app

            class ExampleTest(unittest.TestCase):
                def test_index(self):
                    client = app.test_client()
                    response = client.get('/')
                    self.assertTrue(response.status == '200 OK')
            ```

        - `nosetests -v test_example.py`
        - What happens when we come back and introduce a breaking change? -
          example.py
            
            ```python
            import flask
            import os

            app = flask.Flask(__name__)

            @app.route('/')
            def index():
                return Welcome to Hacking for Hustlers 

            if __name__ == "__main__":
                app.run(host='0.0.0.0', 5000)
            ```

        - `nosetests -v test_example.py`
        - Let's fix it - example.py

            ```python
            import flask
            import os

            app = flask.Flask(__name__)

            @app.route('/')
            def index():
                return "Welcome to Hacking for Hustlers"

            if __name__ == "__main__":
                app.run(host='0.0.0.0', 5000)
            ```

        - `nosetests -v test_example.py`
    - What did we learn here?
        - We set the baseline for what we expect from our index page.
        - We made a change that broke it.
        - We got a detailed headsup on what was broken where *before* we pushed
          it to production.
- What You Should Realistically Know
    - Types of Testing
        - Unit
        - Regression
        - Functional
        - Behavior
    - Learn a testing framework, not a testing technique
        - [Cucumber](http://cukes.info/) for Ruby
        - [Lettuce](http://packages.python.org/lettuce/tutorial/simple.html) for
          Python, though far less mature
        - Rspec and nose are more complex, less narrative
    - Diminishing Returns
        - 100% code coverage rarely happens for production code
        - Weigh time / return - testing can be like A/Bing 40 different shades
          of blue
        - Focus your testing attention on three bits:
            - Data writes - password saving, storing thumbnail, uploading photo.
              This is what affects users the most and are the biggest headache
              to fix
            - Increasing 200 OK - just checking for whether or not the page
              loads at all is a big win and simple to implement
            - The most common user *behaviors* (e.g. the core value props of
              your product)
- Tips on Learning Quickly
    - Use the testing client with your framework
    - Start with just status codes, is everything 200 OK?
    - Use IDE tools -
      [Eclipse](http://help.eclipse.org/helios/index.jsp?topic=%2Forg.eclipse.jdt.doc.user%2FgettingStarted%2Fqs-junit.htm)
      and
      [TextMate](http://testpractices.blogspot.com/2009/06/run-focused-tests-in-textmate-with.html)
      have easy integrations
    - Selenium is a huge timesink - you could spend months with little return
- Resources to Use
    - Here you're a little out of luck - most of the canonical texts are for
      intermediate to advanced developers
    - [The Art of Unit Testing](http://artofunittesting.com/) has good
      practices, but is in .NET
    - [Automated Software
      Testing](http://www.amazon.com/dp/0201432870/?tag=stackoverfl08-20) is the
      canonical piece, but again poor for novices
    - Best approach is to find a project or plugin you are using, and look at
      their tests
    - Great module authors with helpful tests include [Daniel
      Lindsley](http://toastdriven.com/), [Kenneth
      Rietz](http://kennethreitz.com/), [Stevie
      Graham](http://blog.shrewple.com/).
- Conclusions
    - Testing is like eating your Wheaties - do it early and often and you will
      be better off.
    - Tested code is not just better code, but better defined products.
    - You will reduce the friction points of the second hump of development
    - The ROI is one of the highest things you can do for your progress, 
      for your project, and for your product.
