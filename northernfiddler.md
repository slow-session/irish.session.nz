---
layout: page-js
title: The Northern Fiddler
permalink: /northernfiddler/
---
These tunes have been transcribed as closely as possible from:

 * The Northern Fiddler - Music and Musicians of Donegal and Tyrone:
    * Allen Feldman & Eamonn O'Doherty

This page is very much a "Work in Progress" and tunes will be added from time to time. If you want to help, pick a tune that hasn't been transcribed, write out the ABC and send it to the address at the bottom of the page!

There are PDF copies of the book on this site at:

 * [The Northern Fiddler - just the tunes!]({{ site.tunebooks_host }}/tunebooks/The_Northern_Fiddler_Tunes_Only.pdf "PDF - 11M")
 * [The Northern Fiddler, Allen Feldman & Eamonn O'Doherty - complete book]({{ site.tunebooks_host }}/tunebooks/The_Northern_Fiddler.pdf "PDF - 34M")

 There's some useful notes about these tunes put together by Nigel Gatherer at [http://www.nigelgatherer.com/books/nf.html](http://www.nigelgatherer.com/books/nf.html)

<script>
    window.store = {
      {% assign tuneID = 1 %}
      {% assign tunes =  site.northernfiddler | sort: 'page' %}
      {% for tune in tunes %}
        "{{ tuneID }}": {
        "title": "{{ tune.title | xml_escape }}",
        "tuneID": "{{ tuneID }}",
        "mp3_source": "{{ tune.mp3_source | xml_escape }}",
        "page": "{{ tune.page | xml_escape }}",
        "key": "{{ tune.key | xml_escape }}",
        "rhythm": "{{ tune.rhythm | xml_escape }}",
        "url": "{{ tune.url | xml_escape }}",
        },
        {% assign tuneID = tuneID | plus: 1 %}
      {% endfor %}
    };
</script>

<!-- Some boilerplate that's common to a number of pages -->
{% include tunes-search.html tuneBook="northernfiddler" searchTerms="Titles, Rhythms, Musicians" %}

<!-- START of Tunes Grid -->
<div class="gridParent">
  <div class="gridChild" id="tunesGrid"></div>
</div>

<script src="{{ site.js_host }}/js/buildGrid.js"></script>
<!-- END of Tunes Grid -->

<script>
buildGrid.initialiseLunrSearch();
    
document.addEventListener("DOMContentLoaded", function (event) {
    
    buildGrid.displayGrid("northernfiddler", "", window.store);
});
</script>
