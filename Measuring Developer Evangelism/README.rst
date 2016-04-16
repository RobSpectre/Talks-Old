***************
Measuring Developer Evangelism
***************

A thirty minute pragmatic start to measuring your developer outreach program.

Given at `DevRelCon SF`_.


**Table of Contents**


.. contents::
    :local:
    :depth: 1
    :backlinks: none


Outline
============

- Intro

  - In developer outreach, we are often pained to engage into a conversation
    around measurement.

  - There are a few reasons why.

    - For those of us who are Irish, bringing out a ruler can bring up some
      unresolved childhood trauma.

    - It could also be from some painful experiences in previous employment.
      I've certainly learned that when you hear your boss ask, "How do you
      measure yourself?" you have already lost your job.

    - Measurement is also really hard. Developers actively do not want to be
      measured. They don't redeem promo codes. They strip UTM tags out of links.
      They sport JS blockers and browse using Tor.

  - This causes a lot of folks in the developer relations game to give up on
    measurement altogether and just use The Force. Giving up on measurement
    altogether and just going off of intuition.

  - I have a very real personal story about this I'd like to share from my time
    at Twilio.

    - When I first started at Twilio, the longest anyone had been a developer
      evangelist was a year and a day.

    - When I started serving the team in a leadership capacity, the first
      conversation I had was with a devangel that was eight months in and he
      intimated in really great detail why he was burning out of the gig.

    - He said, "Rob, every day in this job is like `Groundhog Day`_."

    - It is exactly like that Bill Murray movie where he gets stuck reliving the
      same day over and over again.

    - He told me, "Rob, I get up in the morning. I say goodbye to my wife and
      kids."

    - I go some weird place to do some kind of song and dance for folks.

    - Then I wake up the next day, and nothing has changed.

    - I have no idea what kind of impact I'm making. I have no idea if that trip
      to Chatanooga was good for the company or not. 

    - And coming up on a year later, that lack of understanding around impact
      was causing him to resent the job.

  - It was really then that I understood the real reason to measure your
    developer outreach.

    - It's not to justify your existence to the company.

    - And it sure as shit isn't to make your boss happy.

    - It's so everyone on your team knows - not thinks, but *knows* - the
      difference they are making with their work.
  - Intro
    
    - Company

    - Bio

    - Agenda

      - Where to start measuring

      - Bad metrics you might be tempted to use

      - Good, pragmatic metrics you can get today

- Where To Start

  - First, do an honest assessment on where you're at with a model for data
    orientation maturity.

    - The Force: Dirty secret - most people aren't measuring anything. If you're
      here, don't feel bad. You are in the majority and this is the easiest
      stage of the pyramid to escape.

    - Data: Teams in this category have access to unfiltered, unsegmented raw
      tables of metrics. These are usually kept in manual spreadsheets, produce
      sums and averages, are prone to human error, and are updated infrequently.
      Folks at this level of maturity usually reference data once per quarter.

    - Information: Teams in this category can get trend lines against simple
      filters for dimensions of the data they care about. They are usually the
      default settings in stock analytics platforms, can sort or order by one
      columns, and can take a while to compile. Crews at this level of maturity
      usually reference data monthly.

    - Knowledge: Folks in knowledge segment their audiences to get lagging
      indicators of success for discrete job functions - they know whether or
      not a particular activity worked. The knowledge at this level is usually
      available only to leaders and gets looked at weekly.

    - Wisdom: Very few organizations make it to the pinnacle of data
      orientation. These teams have well defined leading indicators of success
      and can reliably predict outcomes for particular outputs. Wisdom is
      distributed across the entire team in reliable, easy-to-read dashboards
      everyone on the team can see.

  - Once you have a sense of where you are, the first step is to buy your way to
    the next tier of insight.

    - If you do not yet have one analytics platform, buy one.

    - If you do have an analytics platform and don't know how to use it, buy
      training for every last person on the crew.

    - If you have multiple data platforms and are unsure if what you're seeing
      is the truth, buy consultants to fix it.

  - After you pony up to skip a level, spend your build time to increase the
    frequency with which you get the data.

    - If you're getting data quarterly, build scripts to get the data monthly.

    - If you're getting data monthly, automate a system to get weekly
      visibility.

    - If your managers are the only ones with access now, build simplified 
      dashboards for everyone to consume.

  - Progress matters way more here than perfection.

    - Even directional data is valuable to your output.

    - Ball park numbers still keep you in the game.

    - You're going to feel torn in a million different directions with a million
      things out of your control interfering with your progress.

    - Persevere: any progress will be felt by your crew.

- Bad Metrics

  - Once you've made the committment to buy and build your way to the next level
    of maturity, you will be tempted to invest in bad metrics

  - There are many examples.

    - Amount of content produced

    - Number of meetings

    - Audience size

    - # of events

    - Apps in stores

    - All these are terrible - we'll dive into a few especially common ones

  - Problem with Production metrics like number of events.

    - When I look at the 400 events we did last year, I'm like, "Gosh - that's a
      lot of Twilio love spread all over the world."

    - My CFO takes a different view. He's like, "Gosh - that's a lot of Twilio
      money spread all over the world."

    - Starting with production metrics orients your team and your greater
      company around the costs of the program, instead of the results of the
      program.

    - By starting with production, you're unintentionally raising awareness of
      your cost.

  - Other terrible metrics I hate

    - Apps in stores: When you are building a double-sided marketplace, the only
      thing that will bring developers is market size. Coercing developers to
      publish applications.

    - Quotas: The only thing developers hate more than marketers is salespeople.
      The really dangerous thing about giving your evangelism organization
      quotas is not that they'll refuse and quit, it's that they'll embrace it
      and destroy your credibility with developers.

    - T-shirts handed out: Don't know who used this before, but incenting your
      software organization with points for apparel distribution is unlikely to
      have a pronounced effect on driving adoption of your developer product.
      Even if it did, it is an activity you can easily buy instead of hire.

- Good Metrics

  - Focusing on results metrics will give you and your team better guidance on
    your work.

  - These usually fall into four categories that correspond with your product
    adoption funnel.

    - Awareness: Folks who have heard of your company.

    - Understanding: Folks who know what your company does.

    - Adoption: Folks who have used your product before.

    - Activation: The frequent consumers of your product that form your customer
      base.

    - Of these, activation metrics are the toughest to extract and not where you
      should start.

    - There is plenty you can get with free tools in the top three categories
      that can help give you a sense of what's going on.

  - Awareness: Engaged Traffic

    - To demonstrate the difference of engaged traffic, we'll take two blog
      posts we shipped on the Developer Network team at Twilio. One did well at
      raising awareness around Twilio, one did not. Both trended to the front
      page of popular subreddits, netting about the same amount of traffic.

    - First was a post creating a Pokedex powered by Twilio MMS with 6.5k
      uniques.

    - Second was a post exploring the new await statement proposed in ES7. It
      got two smaller wins on Reddit grabbing 7k uniques.

    - On the surface, the more valuable post for awareness of Twilio would be
      the one that had something to do with Twilio.  Not so.

    - The Pokedex post trended on the subreddit /r/pokemon, drawing a lot of
      traffic that was not valuable for Twilio. Readers stayed on that page an
      average of 2:27, a full minute under average for the /blog.

    - The async post - which doesn't mention the Twilio product at all - kept
      folks on for over 6 minutes.

    - Average Time on Page coupled with traffic can be a killer leading
      indicator of the value of your technical content.

    - Extending the lifetime of these two post extending six months of their
      publication, the post with a tiny average time on page eventually trailed
      off into obscurity.

    - The post that gripped its readers nabbed buckets of Google juice over
      time, to the point where it is now getting nearly as much traffic a month
      as it did the same month it trended on reddit.

  - Understanding: Lit Fuses

    - After gauging awareness through measuring engaged traffic, finding the lit
      fuses in your traffic and identifying if that audience is growing can be
      useful.

    - These are the prime developers that have both heard of your product and
      now know what it does.

    - A great instrument for this is the HEUy and the DEUy.The Highly Engaged
      User and the Highly Engaged User that has visited the docs

    - a HEU is borrowed from the world of web analytics and is likely as useful
      for you as it is for us. It is a rare metric that works for nearly every
      company that has a website.

    - Segmenting your traffic to identify the HEUs characteristics can give you
      this number.

    - Find the number of people who visit your site that stay for longer than 3
      minutes and click on more than 3 things.

    - On Twilio.com, this segment accounts for 90% of the conversions. They are
      also 3x more likely to signup and 4x more likely to upgrade.

  - Adoption: Lifecycle Events

    - After gauging awareness by looking at engaged traffic and then gauging
      understanding by looking at Highly Engaged Users, you can next turn your
      attention to capturing conversion to lifecycle events.

    - These are dependent on your business model, but usually there is some sort
      of conversion event that corresponds to a Signup. This may be a working
      account, this may just be membership to your developer program, but we'll
      use the word "Signup" to describe a developer hopping on board your
      product's train and taking it for a spin for the first time.

    - Problem with Signups is they can be super noisy and difficult to correlate
      to your activity in the field.

    - A tool we use to reduce that noise and identify actual impact is the
      Designated Media Area. It is a geographic unit of a city's full
      metropolitan area borrowed from advertising.

    - This ends up being way more useful than a zip code

    - Example from a couple months ago: a hackathon in Chicago.

      - It happened 21 Nov. Looking at the signup stats corresponding to Chicago
        zip codes, it looks like a failure.

      - And if we look at the effect on the entire state, we also can't see any
        real impact. There are many peaks over the course of the week - our
        field activity doesn't correspond with the highest peak

      - However, if we look at the DMA - the greater metropolitan area of
        Chicago, we can see a peak corresponding with our hackathon.

      - This pattern has repeated for hundreds of hackathons over the course of
        the past 5 years at Twilio. The DMA turns out to be the best attenuator
        for signal to noise.

- Conclusions

  - Do an honest assessment of where you are and where you want to be.

  - Find three good metrics that you want to look at.

  - Buy your way to the visibility to the next level of those three metrics.

  - Build your way to more frequent visibility of those three metrics.

  - And be prepared for the long haul. Measurement takes a long time, but like
    anything else you do for your team, any progress will be felt by everyone.

  - And eventually, you'll break the Groundhog Day cycle of evangelism and make
    this wilg gig a sustainable career.



Meta
===========

* Written by `Rob Spectre`_
* Released under `MIT License`_
* Software is as is - no warranty expressed or implied.

.. _Twilio: http://www.twilio.com
.. _Rob Spectre: http://www.brooklynhacker.com
.. _MIT License: http://opensource.org/licenses/MIT
.. _DevRelCon SF: http://sf2016.devrel.net/
.. _Groundhog Day: https://en.wikipedia.org/wiki/Groundhog_Day_(film)
