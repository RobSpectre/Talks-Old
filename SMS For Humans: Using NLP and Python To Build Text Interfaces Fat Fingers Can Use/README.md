## Outline

- Intro
    - Natural Language Processing
        - It's a branch of human computer interaction focusing on machine
          comprehension of the utterances you and I have been wired genetically
          to understand.
        - It's the high speed mathematical collision of linguistics, computer
          science and machine learning to capture in ones and zeros the seeming
          magic of human language.
        - As you can imagine, it is damn hard.
        - This language thing that separates _homo sapien_ from
          the rest of Kingdom _Animalia_ is way, way complex to model.
        - Holy biscuits is it tough.  Nevermind the 6,500 languages spoke on
          Planet Earth today and just focus on English, you've still only made a
          sliver in-road on reducing the problem scope to be addressable.
        - Language is incredibly, delightfully ambiguous. Consider the
          following:
            - I watched the Enterprise hover over New York.
            - I saw the man on the hill with the telescope.
            - Rob and Brandon took two trips to Poland.  They were both
              wonderful.
            - The word bank has 26 different definitions in the OED.
        - It is little wonder then in the development of post-modern software
          that NLP is frequently an all or nothing proposition.
        - You have software for which NLP is the primary feature or software
          that has no NLP at all.
        - Siri, Cortana, Google Now and whatever the broken thing is that is
          powering my smart watch.
        - But we as Python developers have a luxury few other languages
          communities enjoy in the form of a wealth of open source libraries
          that make advanced NLP function available to the lay programmer.
        - The Python community has made some of the best NLP software that
          exists, open source or not, and much of it is available to folks with
          little exposure to the math or science that drives the field.
        - So I'd like to advocate today for sprinkling more natural language
          processing in more places, moving from the focus of an application to
          a functional part of a user experience.
        - One experience I work with a lot everyday is SMS.
    - SMS as a global medium
        - 6.8 billion cellular subscriptions worldwide
        - More cell phones than people
        - Most of them can make calls, but all of them can send SMS
    - Development tools and vendors have made creating SMS apps easier
    - But the interface for these apps still SUCK
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
    - Set up a [Twilio phone number](http://www.twilio.com/try-twilio).
    - Create a Flask app that responds to a Twilio text message.
        ```python
        from flask import Flask

        from twilio import twiml


        app = Flask(__name__)


        @app.route('/sms', methods=['POST'])
        def sms():
            response = twiml.Response()
            response.message("Hey guys - thanks for coming to my talk.")
            return str(response)


        if __name__ == '__main__':
            app.debug = True
            app.run()
        ```
    - Write a quick funny message.
    - Everyone tries it from the audience.
- Adding NLP can be easy
    - Introduce TextBlob
    - Demonstrate tokenization by returning the number of words.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        response.message("This message had {} words.".format(len(blob.words)))

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Demonstrate tokenization by returning the number of sentences.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        response.message("This message had {} words.".format(len(blob.sentences)))

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Demonstrate part-of-speech tagging by returning the number of proper
      nouns.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        proper_nouns = [tag[0] for tag in blob.tags if tag[1] == 'NNP']

        response.message("I found these proper nouns: {}".format(proper_nouns))

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
- Personalizing responses with Sentiment Analysis
    - Adjust interface to deliver personalized responses based on sentiment
    - Demonstrate sentiment analysis with TextBlob
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        sentiment = blob.sentiment

        response.message("Sentiment for that message: {}".format(sentiment))

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Adjust example above with two responses for postive and negative
      sentiments
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        sentiment = blob.sentiment

        if sentiment.polarity > 0:
            response.message("Awesome! I'm stoked you're stoked.")
        elif sentiment.polarity < 0:
            response.message("Railer.  I'm bummed you're bummed.")
        else:
            response.message("Meh.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Adjust subjectivity to avoid weirdness.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        sentiment = blob.sentiment

        if sentiment.polarity > 0 and sentiment.subjectivity > 0.7:
            response.message("Awesome! I'm stoked you're stoked.")
        elif sentiment.polarity < 0 and sentiment.subjectivity > 0.7:
            response.message("Railer.  I'm bummed you're bummed.")
        else:
            response.message("Meh.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Have audience try.
- Routing Requests With Lemmatization
    - A common service in the sharing economy is connecting buyers and sellers
      in commercial networks, often using SMS.
    - Let's say we have folks that want to buy and sell music gear and are using
      SMS to do it.
    - A naive implementation would be an if... else that looks for a string
      inside the text message and takes action.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        if "buy" in blob:
            response.message("Cool - I'll connect you with a seller.")
        elif "sell" in blob:
            response.message("Rad - I'll connect you with a buyer.")
        else:
            response.message("What would you like to do?")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - But obviously this breaks down pretty quickly.  Let's just try the past
      tense with bought and sold.
    - Then when you add trading you run into the same problem.
    - If you're just string matching, pretty soon it becomes a maintenance mess.
    - Let's see how we can smooth this out with some NLP.
    - First extract all the verbs in the message.
    - Introduce the concept of the lemma - the psycholinguistic root of a word.
    - Buy, buying and bought are all extended from the buy lemma - let's try
      adjusting our implementation with that.
    - Implement with TextBlob.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        verbs = [tag[0] for tag in blob.tags if 'V' in tag[1]]

        if verbs:
            for verb in verbs:
                if 'buy' == verb.lemma:
                    response.message("Cool - I'll connect you with a seller.")
                elif 'sell' == verb.lemma:
                    response.message("Groovy - I'll connect you with a buyer.")
                elif 'trade' == verb.lemma:
                    response.message("Killer - I'll connect you with a trader.")
        else:
            response.message("I couldn't tell what you want to do.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Have audience try.
- Forgiving Fat Fingers with Spelling Correction
    - The HELP keyword - a staple of nearly every SMS application I see.
    - Quick implementation.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        if 'help' in blob.lower():
            response.message("This is an information message.")
        else:
            response.message("For more information, text HELP.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - But, ironically, smartphones have made this worse.
    - Keyboards continue to get smaller and for iOS and Android, autocorrect
      only kicks in after some sort of whitespace or punctuation delimiter.
    - You get a whole lot of requests for 'hlep' to a popular SMS application.
    - Terrible experience for the user - we can improve it for them with some
      NLP.
    - Demonstrate autocorrect hell with the HELP / hlep keyword.
    - Write function to spellcheck for single word phrases.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        if len(blob.words) == 1:
            if 'help' == blob.lower().correct():
                response.message("This is a informational help message.")
            else:
                response.message("For more information, text HELP.")
        else:
            response.message("For more information, text HELP.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Have audience try.
- Intentional International Apps with Language Detection
    - Demonstrate common bilingual HELP message.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        response.message("For more information, text HELP. Para más información, "
                         "texto AYUDA.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Describe problems with user behavior biasing and cognate collision.
    - Introduce Google Translate API with TextBlob's interface
    - Use language detection to select language for HELP message.
    ```python
    from flask import Flask
    from flask import request

    from textblob import TextBlob

    from twilio import twiml


    app = Flask(__name__)


    @app.route('/sms', methods=['POST'])
    def sms():
        response = twiml.Response()
        body = request.form['Body']

        blob = TextBlob(body)

        if 'es' == blob.detect_language():
            response.message("Lo siento por mi muy gringo español.")
        else:
            response.message("I am sorry for my very gringo Spanish.")

        app.logger.info("Received: '{}'\nSent: '{}'".format(body,
                        response.verbs[0].verbs[0].body))

        return str(response)


    if __name__ == '__main__':
        app.debug = True
        app.run()
    ```
    - Have audience try.
- Conclusion
    - SMS is a medium Python programmers can use to touch 6.8 billion people
    - Those touches should be more human, which is what we're all about as
      Python programmers
    - NLP tools have practical applications for lay programmers - you don't have
      to be a computer scientist to make NLP-powered human interfaces for your
      users
    - Plus, it is fun as shit.
