## We Were Promised Jetpacks: An Introduction to Android Wear Development

A 30 minute introduction to building an app on Android Wear for intermediate to
experienced Android developers.

## Outline

- Intro
    - Personal story
        - I was pretty poor when I was a kid.
        - When I was 10, the Casio calculator watch became "affordable" for the
          first time.
        - For $100, you could sport an arithmetically awesome accessory that
          would let you burn through your multiplication tables in no time.
        - Now, for me growing up in a trailer park, $100 might as well have been
          a billion dollars - an impossible amount of money that ensured the
          calculator watch would never be in my possession.
        - Which made me want it so much more.
        - I would lay awake dreaming about how boss I would look with a
          calculator watch.  Roll into the classroom, say "Yo - you need some
          shit calculated? Well let me just consult my *wrist*."
    - Flash forward to this summer
        - Friggin' everyone is coming out with boss watches
        - 10 year old Rob's envy popped out of my cerebrum with full psychic
          force.
        - It's a boss watch! That does things!  And I can afford it!  Holy
          biscuits!
        - It's connected to the Internet, it's an open platform I can hack on,
          and wonder of wonders, they were handing them out - for *free* - at
          Google I/O!
        - I walked out of there thinking, "Yo - you need to see the future?
          Well let me just consult my *wrist*."
        - I tell you all this because you need to understand, I was the most
          enthusiastic supporter of the smart watch before they were released
          this summer.
    - Disillusionment
        - But like many of you, that enthusiasm was shortlived.
        - Instead of the device that would finally fulfill the 20 year envy I
          suffered from grade school, we got Google Glass for the wrist.
        - It was bigger than we anticipated
        - It's battery life meant you had to recharge it with a bulky charger
          every night.
        - And it was depressingly short on the Jetsons type features we've all
          been waiting for.
    - This is the future?
        - We were promised jetpacks
        - We were promised hoverboards
        - We were promised teleportation, holograms and flying cars.
        - We were promised the future of computing.
        - And instead we got the smatch
            - A hunk of plastic that looks like it was issued by a correctional
              facility
            - That doesn't even have feature parity with Dick Tracy.
            - Issue with the first watch face I liked
    - Cause for optimism
        - It is clear the platform makers - that is to say the manufacturers and
          Apple and Google - have their hands full making the device work
        - Cramming a touchscreen, connectivity, CPU, GPU, sensors, microphone
          and battery all onto your wrist is a stonkingly difficult problem
        - It is obvious from three months of Android Wear and the demonstration
          earlier this month from Apple, both platforms haven't figured out how
          to make it useful yet.
        - That is an extraordinary opportunity for developers.
        - We don't get green fields on new form factors very often.
        - This isn't like a tablet, it's a fundamentally different form factor.
        - And that should have all of us very stoked.
        - If there is going to be a future for the smatch, that future is in our
          hands.
    - Agenda
        - Bio
        - Twilio
        - Introduction to Android Wear Development
            - Usability
            - Developing on Wear
            - Resources and Tricks
            - Conclusions
- Device
    - Overview
        - Not a stand alone watch
        - Married to your handset
        - Communicates over bluetooth
        - Apps serve as clients to the handset
    - UX
        - Driven by notification cards - very familiar to Glass users
        - Interaction is swipe / single button
        - Input is voice drive
        - Voice recognition not nearly as fast as what is available on the
          handset
        - LG devices usually requires repetition to get the command you want
    - Day to Day Wear
        - Still not essential; I forget it often when in a hurry to leave the
          house.
        - Drains the device - can't get a full work day out of a Nexus 5
        - Default settings the LG watch will survive 13 hours
    - App ecosystem
        - It's pretty easy to make an existing Android app compatible with Wear.
        - App ecosystem is definitely growing, but are mostly just
          notifications.
        - Most useful stuff so far are tickets, remote control and fitness.
            - [Delta](https://play.google.com/store/apps/details?id=com.delta.mobile.android)
            - [Amazon
              Music](https://play.google.com/store/apps/details?id=com.amazon.mp3&hl=en)
            - [RunKeeper](https://play.google.com/store/apps/details?id=com.fitnesskeeper.runkeeper.pro)
        - Thoroughly unessential - I forget to wear it all the time
        - Chatty apps get undeleted as a result of the unique social stigma of
          having them on your wrist
- Developing On Wear
    - Overview
        - Paradigms
            - Will need to be bundled with a handset app
            - Wear app serves as a client to your Android app
            - Provides the connectivity and persistance
            - Can sync objects, messages, and blobs between app and Wear through
              DataLayer
        - Two types of integration 
            - Android apps with Wear support
            - Wear apps that actually run on the wearable itself
            - Including the support for the former takes at most an afternoon
            - Latter does require a switch to Android Studio
        - Constraints
            - Apps go to sleep with inactivity
            - Sleep jerks the user out of your app
            - Persistent display can only be done through a notification
            - Users find and install apps from the handset or the web, not on
              the watch - important for distribution
            - Some of the API is unavailable - notably no webkit.
            - You can use hasSystemFeature() to see if an API is supported on
              the device
        - Getting Started
            - Need rev20 of the v4 support library that was released in July
            - Comes with all the extensions for wearables, mostly with
              NotificationCompat
            - Also ships with improvements on SwipeRefreshLayout which you'll
              want
            - For use of DataLayer, you will need Play Services
    - Notifications
        - What It Looks Like
            - Card with primary intent
            - Swipe of additional intents
            - Single press action like archive / favorite / star / delete
            - Free form input with speech recognition
        - Implementation
            - Use NotificationCompat to build notifications and they show on the
              wearable.
        - Additional actions can be provided
            - use addAction() to the builder to add multiple actions to the
              notification
            - They are accessed by the user by swiping left
            - Demonstration using ic_map drawable
        - Customizing output for the wearable
            - Available using the WearableExtender
            - Actions added using WearableExtender only appear on the wearable
    - Apps
        - Setup AVD
            - Emulator is still way buggy
            - Most of your development you're going to want to do debugging over
              Bluetooth
            - AVD only available in Android Studio
            - Does have square and round faces to glance at layouts
            - Much like Android of old, you'll want to have the hardware handy
        - Layout
            - Notifications is the only persistence on the device
            - There is an unofficial library for creating your own in app
              layouts
            - Includes a BoxInsetLayout, and some activities and views to build
              your interface.
            - Has broken a few times already - Google makes no guarantee on
              compatibility
        - Voice Input
            - This is the most useful part of actually going to the trouble of
              packaging an app
            - You can declare intents for the system voice commands like "take a
              note" or "call a car"
            - Or you can create actions for voice input and handle with a
              callback
        - Packaging
            - Ultimately, the wear app must be bundled with a handset app for
              the user to install.
            - Wear users can't browse and install apps from the watch itself, it
              is done through the handset and Play Store
            - Packaging is pretty simple - just declare the wearable app as a
              dependency in Gradle.
    - Data Layer
        - Overview
            - Syncing is managed through the Data Layer API that comes with Play
              Services
            - You can sync Data Items, Messages and Assets.
            - Accessible to the app through listeners
            - Disconnects and syncs are handled by the Data Layer - you don't
              have to worry about it
        - Creating Events
            - Uses Wearable.DataApi on the handset to relay to wearable
            - Accepts DataItems, Messages and Assets.
            - Example of datamap
        - Listener
            - Can do sync and async waiting
            - Available through WearableListenerService()
            - You can listen for onDataChanged(), onMessageReceived(), on
              disconnect and connect.
        - Other types
            - Assets and Messages work much the same way
            - Assets are blobs like images
            - Be wary of image size.
- Conclusions
    - The smatch is not there yet.
    - But that's actually a good thing for developers - the future of this
      device is what we make it.
    - Promising Hacks
        - [Wear Camera](https://github.com/dheera/android-wearcamera/)
        - [Expense Tracker](https://play.google.com/store/apps/details?id=lv.bestan.android.wear.expensestracker&hl=en)
    - If this thing is going to make it, it is going to be because of you.
    - But I'm still waiting on my jetpack.

