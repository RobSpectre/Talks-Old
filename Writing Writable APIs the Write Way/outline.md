Writing Writable APIs the Write Way

1) Intro
	a) The Internet is like a library
	b) But, for developers, it is more appropriately an art gallery
	c) We've all built cool apps that use data.
	d) But the coolest apps all *create* data.
	e) There are tons of data sources to choose from, and yet most of the time, you can't write!
	f) You're viewing photos and videos and favorites and reviews, but only under very precise conditions can you create your own.
	g) You have to jump through extraneous hoops (e.g. oAuth)
	h) But where can you you go?
	i) Sometimes you want to create.
	j) Sometimes you want to write.
	k) Sometimes you want to go where everybody knows your name.
2) FluidInfo High Level
	a) New York startup
	b) Started by Terry Jones, one of my heroes
	c) Whole thing is based on Python/Twisted
3) FluidInfo Data Model
	a) Objects
	b) Tags
	c) Namespaces
	d) Permissions
4) Create the API - coding walk through
	a) Create an arbitrary namespace
		1) h, r = fluidinfo.call("POST", "/namespaces/[demouser]", {'name': 'demoNamespace', 'description': 'Demo Description'})

	b) Create a tag for the namespace
		1) h, r = fluidinfo.call("POST", "/tags/[demouser]/[demonamespace]", {'name': 'demoTag', 'description': 'Demo Tag.', 'indexed': False})

	b) Create some objects
		1) Introduce /about endpoint: h, r = fluidinfo.call("POST", "/about/demo object")
		2) Add tag: h, r = fluidinfo.call("PUT", "/about/demo object/demouser/demoNamespace/demoTag")

	c) Check out what we've done so far.
		1) Introduce basic query:  h, r = fluidinfo.call("GET", "/objects", query="has demouser/demoNamespace/demoTag")

	d) Demonstrate bringing up the information in another REST interface (e.g. apigee)
5) Super Bonus Points Fun
	a) Show off types with tags
		1) Select a couple objects
		2) Tag with integer value: h, r = fluidinfo.call("PUT", "/about/demo object/demouser/demoNamespace/demovalue", 7)
		3) Query for integer value: h, r = fluidinfo.call("GET", "/objects", query="demouser/demoNamespace/demovalue > 5")
	b) Opaque Values
		1) Create a photo tag:h, r = fluidinfo.call("POST", "/tags/[demouser]/[demonamespace]", {'name': 'photo', 'description': 'Photo tag.', 'indexed': False})
		2) Save a photo: h, r = fluidinfo.call("PUT", "/about/demo object/demouser/demoNamespace/photo", photo.read(), mime="image/jpg")
		3) Get object: h, r = fluidinfo.call("GET", "/about/demo object")
		4) View photo in browser: https://fluiddb.fluidinfo.com/objects/[object id]/demouser/demoNamespace/photo
