---
layout: page-js
title: Tunes Archive
permalink: /tunes_archive/
---
    
{% assign tunes = site.tunes %}
{% assign sortedtunes = tunes | sort: 'titleID' %}
{% assign tuneID = 1 %}
<script>
window.store = {
    {% for tune in sortedtunes %}
        "{{ tuneID }}": {
            "title": "{{ tune.title | xml_escape }}",
            "tuneID": "{{ tuneID }}",
            "key": "{{ tune.key | xml_escape }}",
            "rhythm": "{{ tune.rhythm | xml_escape }}",
            "url": "{{ tune.url | xml_escape }}",
            "mp3": "{{ site.mp3_host | append: tune.mp3_file | xml_escape }}",
            "mp3_source": "{{ tune.mp3_source | strip_html | xml_escape }}",
            "repeats": "{{ tune.repeats }}",
            "parts": "{{ tune.parts }}",
            "abc": {{ tune.abc | jsonify }}
        }{% unless forloop.last %},{% endunless %}{% assign tuneID = tuneID | plus: 1 %}
    {% endfor %}
};
</script>

<p>
Play a tune now using the <strong>Play Now</strong> button or use the
link to the Tune Page for a more traditional view. 
</p>

 - <input class="filterButton" type="button" onclick="window.location.href='/latest/';" value="Latest Tunes" /> - see the tunes we've added most recently
{% include jukebox.html %}
{% include tradle.html %}

{% include tunes-search.html tuneBook="tunesarchive" searchTerms="Titles, Rhythms, Musicians" %}

{% include tuneModal.html %}

<!-- START of Tunes Grid -->
<div class="gridParent">
  <div class="gridChild" id="tunesGrid"></div>
</div>

<script src="{{ site.js_host }}/js/buildGrid.js"></script>
<!-- END of Tunes Grid -->

<script>
buildGrid.initialiseLunrSearch();

document.addEventListener("DOMContentLoaded", function (event) {
    buildGrid.displayGrid("tunesarchive", "", window.store);

}, false);
</script>
