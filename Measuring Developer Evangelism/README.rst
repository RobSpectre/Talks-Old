***************
Twilio Reveal Template
***************

A template project for `Reveal.js`_ presentations used for my `Twilio`_ talks.


**Table of Contents**


.. contents::
    :local:
    :depth: 1
    :backlinks: none


Features
============

* Photo cards
* Headline cards
* Charts with `C3`_
* Map cards with `Google Maps`_
* Funnel charts with `Highcharts`_
* Network visualizations with `Viz.js`_
* YouTube embeds


Installation
============

Clone repo

.. code-block:: bash

    $ git clone https://github.com/RobSpectre/Twilio-Reveal-Template.git 


Install ``grunt`` and ``bower``

.. code-block:: bash
    
    $ npm install -g bower grunt

Install node dependencies

.. code-block:: bash

    $ npm install

Install client dependencies

.. code-block:: bash

    $ bower install

Serve presentation 

.. code-block:: bash
    
    $ grunt serve


Deploy to Heroku
================

This template comes with some helpers to make it easy to deploy your
presentations to Heroku.  Once you have cloned the repo and built your
presentation, use the following steps to deploy the presentation to Heroku.

Create Heroku app.

.. code-block:: bash

    $ heroku create

Configure Heroku app to use Multi-Buildpack so dependencies can be executed in
order.

.. code-block:: bash

    $ heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git

Push your presentation to Heroku

.. code-block:: bash

    $ git push heroku master

Open the presentation on your newly deployed host.

.. code-block:: bash

    $ heroku open


Meta
===========

* Written by `Rob Spectre`_
* Released under `MIT License`_
* Software is as is - no warranty expressed or implied.

.. _Twilio: http://www.twilio.com
.. _Reveal.js: http://lab.hakim.se/reveal-js/
.. _C3: http://c3js.org/
.. _Google Maps: https://developers.google.com/maps/documentation/javascript/
.. _Highcharts: http://www.highcharts.com/
.. _Viz.js: http://visjs.org/
.. _Rob Spectre: http://www.brooklynhacker.com
.. _MIT License: http://opensource.org/licenses/MIT
