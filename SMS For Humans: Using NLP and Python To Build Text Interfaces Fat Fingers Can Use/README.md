## Outline

- Intro
    - SMS as a global medium
        - 6.8 billion cellular subscriptions worldwide
        - More cell phones than people
        - Most of them can make calls, but all of them can send SMS
    - Development tools and vendors have made creating SMS apps easier
    - The interface for these apps still SUCK
        - KEYWORDs in ALL CAPS still serve as the main INTERFACE
        - As Python programmers, we have a lot of tools to fix this
        - NLP
    - Bio
        - Rob
        - Twilio
        - Libraries
            - TextBlob
            - nltk
            - Google Translate API
- The Interface We've All Seen
    - Create a Flask app
    - Set up a Twilio phone number
    - Create endpoint for number
    - Write quick if... else to accept a KEYWORD for one message
    - Everyone tries it from the audience
- Personalizing responses with Sentiment Analysis
    - Adjust interface to deliver personalized responses based on sentiment
    - Introduce TextBlob
    - Demonstrate sentiment analysis with TextBlob
    - Adjust example above with two responses for postive and negative
      sentiments
    - Have audience try.
- Routing Requests With Tokenization and Lemmatization
    - Adjust interface to do one thing if the message is about widgets, another
      if it is for sprockets.
    - Introduce tokenization and lemmatization with nltk
    - Write an endpoint that makes different responses for widgets and
      sprockets with natural language.
    - Have audience try.
- Forgiving Fat Fingers with Spelling Correction
    - Demonstrate autocorrect hell with the HELP / hlep keyword.
    - Introduce TextBlob spelling correction
    - Write function to check for misspelled keyword.
    - Have audience try.
- Intentional International Apps with Language Detection
    - Demonstrate common bilingual HELP message.
    - Describe problems with user behavior biasing and cognate collision.
    - Introduce Google Translate API with TextBlob's interface
    - Use language detection to select language for HELP message
    - Have audience try.
- Conclusion
    - SMS is a medium Python programmers can use to touch 6.8 billion people
    - Those touches should be more human, which is what we're all about as
      Python programmers
    - NLP tools have practical applications for lay programmers - you don't have
      to be a computer scientist to make NLP-powered human interfaces for your
      users
    - Plus, it is fun as shit.
