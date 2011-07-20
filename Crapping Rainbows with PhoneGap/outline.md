## Crapping Rainbows with PhoneGap

A fifteen minute look at PhoneGap from a dude who has never used PhoneGap.


### Summary

PhoneGap is a FOSS mobile framework that supports six mobile platforms, including iOS, Android, Blackberry, and Windows Phone.  Boldly claiming itself
a gateway for web developers to develop mobile apps with native look and feel, PhoneGap could be the Holy Grail for web developers to enter the mobile space
with only one codebase to maintain.


### Outline

- Intro
    - Imagine a sane mobile world
    - A world where you can use the same tools for the web for mobile devices
    - A world where a platform abstracts all the minute differences from SDK versions, hardware revisions, and patches
    - A world where you write once and deploy to all
    - A world where the Yankees always lose and the Red Sox always win
    - A world where unicorns crap rainbows on Bedford Ave, making life hell for the hipster indentured servants
    - Talk Agenda
    	- Introduction to PhoneGap
    	- Traction
    	- How It Works
    	- What The Code Looks Like
    	- How to Get Started
    	
- Caveat
    - I haven't used PhoneGap
    - I don't know anyone that has used PhoneGap
    - I haven't seen a wildly successful app that uses PhoneGap
    - This talk represents ~12 hours of research and 80 gallons of wishful thinking
    - It is a hair better than Let Me Google That For You - consider it a preliminary tech evaluation
    
- Introduction to PhoneGap
	- Developed by Nitobi Software and IBM
	- MIT license
	- HTML5, CSS and (lots of) JavaScript to create mobile apps
	    - Wayyyy more people know how to make a website than write Objective C
	    - One code base for your entire mobile portfolio
	    - Cheaper, better functional testing (e.g. Selenium)
	- Native performance and experience
	- How do they make money?
	    - PhoneGap Build: cloud-based build system for PhoneGap apps
	    - More professional services likely in the works  
	
- Traction
    - Release candidate for 1.0 GA
    - Apple has approved its use, even with the new iOS 4.0 developer license changes
    - appMobi has adopted it as the backbone of their client service
    - Built-in to Adobe Dreamweaver 5.5
    - Active community
    	- NYC Meetup group has 181 members, last met in May
    	- IRC channel ~75 folks, fairly responsive to questions
    	- Mailing list has 6081 members, ~1500 threads a month
    - 350k downloads, "thousands" of apps
    
- How It Works
    - Write your app - whatever you want, backbone, jQuery touch or mobile, XUI, Impact (if you're making a game)
    - *Wrap* that app with PhoneGap
    - Access native hardware features through the PhoneGap API
    - PhoneGap build - This is the awesome sauce.
    
- What The Code Looks Like
    - Interface Events
    	- Device Ready
    	
    	```javascript
    	// Add the listener
    	document.addEventListener("deviceready", onDeviceReady, false);

		function onDeviceReady() {
		    // Application is fully loaded
		}
    	```
    	
        - Online / Offline
        
        ```javascript
        // Add the listener
        document.addEventListener("online", onOnline, false);
        
        // Execute when the application has Internet access
        function onOnline() {
        	// Do something with Internet Access
        }
        ```
    	
    	- Platform Specific Inputs
    	
    	```javascript
    	// Add the listener
    	document.addEventListener("backbutton", onBackButton, false);

		function onBackButton() {
		    // Do something when the back button is pressed.
		}
    	``` 
    	
    - Get Data From The Phone
    	- Device Info
    	
    	```javascript
    	// These are totally the same thing - device info is scoped globally.
    	var phoneName = window.device.name;
		var phoneName = device.name;
		
		// These are also totally the same thing
		var phoneUuid = window.device.uuid;
		var phoneUuid = device.uuid;
    	```
    
        - Contacts
        
        ```javascript
        // Create a Contact
        var newContact = navigator.contacts.create({"displayName": "Rob Spectre"});
        
        // Find a Contact
                
        ```
        
        ```javascript
        // Define callbacks
        function onSuccess(contacts) {
		    alert('Found ' + contacts.length + ' contacts.');
		};
		function onError(contactError) {
		    alert('onError!');
		};
		
		// Find all contacts named Rob
		var options = new ContactFindOptions();
		options.filter="Rob";
		var fields = ["displayName", "name"];
		
		// Do search passing fields, callbacks and filter options.
		navigator.contacts.find(fields, onSuccess, onError, options);
        ```
        
        - Media
        
        ```javascript
        function playAudio(uri) {
		    // Play the audio file at the specified URI
		    var my_media = new Media(uri,
		        // success callback
		        function() {
		            console.log("playAudio():Audio Success");
		        },
		        // error callback
		        function(err) {
		            console.log("playAudio():Audio Error: "+err);
		    });
		
		    // Play audio
		    my_media.play();
		}
        ```
        
    - Cool Shit You Can't Do (Easily) With The Built-in Browser
        - Compass
        
        ```javascript
        // Define callbacks
        function onSuccess(heading) {
		    return heading;
		};
		
		function onError() {
		    alert('Error!');
		};
		
		// Get heading
		var heading = navigator.compass.getCurrentHeading(onSuccess, onError);
        ```
        
        - Capture Audio / Photo / Video
        
        ```javascript
        // Define callbacks
		var captureSuccess = function(mediaFiles) {
		    var i, path, len;
		    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		        path = mediaFiles[i].fullPath;
		        // Do something with the photo
		    }
		};
		

		var captureError = function(error) {
		    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
		};
		
		
		// Take photo
		navigator.device.capture.captureImage(captureSuccess, captureError, {limit:2});
        ```
        
        - Local SQL DB
        
        ```javascript
        var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
        ```
        
- How To Get Started
    - phonegap.com
    - Free O'Reilly book online by Jonathan Stark (http://ofps.oreilly.com/titles/9780596805784/)
    - HowToForge has a good step-by-step to setting up your dev environment (http://www.howtoforge.com/setting-up-an-android-app-build-environment-with-eclipse-android-sdk-phonegap-ubuntu-11.04)
    - Let me know how it goes (@dN0t)