Writing Writable APIs the Write Way

- Intro
    - The Internet is like a library
	- But, for developers, it is more appropriately an art gallery
    - We've all built cool apps that use data.
    - But the coolest apps all *create* data.
    - There are tons of data sources to choose from, and yet most of the time, you can't write!
    - You're viewing photos and videos and favorites and reviews, but only under very precise conditions can you create your own.
    - You have to jump through extraneous hoops (e.g. oAuth)
    - But where can you you go?
    - Sometimes you want to create.
    - Sometimes you want to write.
    - Sometimes you want to go where everybody knows your name.
- FluidInfo High Level
    - New York startup
    - Started by Terry Jones, one of my heroes
    - Whole thing is based on Python/Twisted
- FluidInfo Data Model
    - Objects
    - Tags
    - Namespaces
    - Permissions
- Create the API - coding walk through
    - Create an arbitrary namespace
    	```python
        h, r = fluidinfo.call("POST", "/namespaces/[demouser]", {'name': 'demoNamespace', 'description': 'Demo Description'})
		```

    - Create a tag for the namespace
        ```python
        h, r = fluidinfo.call("POST", "/tags/[demouser]/[demonamespace]", {'name': 'demoTag', 'description': 'Demo Tag.', 'indexed': False})
		```
    - Create some objects
        - Introduce /about endpoint
        ```python
        h, r = fluidinfo.call("POST", "/about/demo object")
        ```
        - Add tag: 
        ```python
        h, r = fluidinfo.call("PUT", "/about/demo object/demouser/demoNamespace/demoTag")
        ```
    - Check out what we've done so far.
        - Introduce basic query
        ```python
        h, r = fluidinfo.call("GET", "/objects", query="has demouser/demoNamespace/demoTag")
        ```
        - Demonstrate bringing up the information in another REST interface (e.g. apigee)
- Super Bonus Points Fun
    - Show off types with tags
        - Select a couple objects
        - Tag with integer value: 
        ```python
        h, r = fluidinfo.call("PUT", "/about/demo object/demouser/demoNamespace/demovalue", 7)
        ```
        - Query for integer value: 
        ```python
        h, r = fluidinfo.call("GET", "/objects", query="demouser/demoNamespace/demovalue > 5")
        ```
    - Opaque Values
        - Create a photo tag:
        ```python
        h, r = fluidinfo.call("POST", "/tags/[demouser]/[demonamespace]", {'name': 'photo', 'description': 'Photo tag.', 'indexed': False})
        ```
        - Save a photo: 
        ```python
        h, r = fluidinfo.call("PUT", "/about/demo object/demouser/demoNamespace/photo", photo.read(), mime="image/jpg")
        ```
        - Get object: 
        ```python
        h, r = fluidinfo.call("GET", "/about/demo object")
        ```
        - View photo in browser: 
        ```python
        https://fluiddb.fluidinfo.com/objects/[object id]/demouser/demoNamespace/photo
        ```