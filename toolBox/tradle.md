---
layout: page-tradle
permalink: tradle
---

<h1 class="tradleHeader">Tradle</h1>

<p class="tradleHeader">If you've played <b>Wordle</b> then you know what to do!</p>

{% assign tunes = site.tunes %}
{% assign sortedtunes = tunes | sort: 'titleID' %}

{% assign tuneID = 1 %}
<script>
window.store = {
{% for tune in sortedtunes %}
{% if tune.mp3_file contains '/mp3/cm/' %}{% continue %}{% endif %}
    "{{ tuneID }}": {
        "title": "{{ tune.title | xml_escape }}",
        "tuneID": "{{ tuneID }}",
        "key": "{{ tune.key | xml_escape }}",
        "rhythm": "{{ tune.rhythm | xml_escape }}",
        "url": "{{ site.mp3_host | append: tune.url | xml_escape }}",
        "mp3": "{{ site.mp3_host | append: tune.mp3_file | xml_escape }}",
        "mp3_source": "{{ tune.mp3_source | strip_html | xml_escape }}",
    }{% unless forloop.last %},{% endunless %}
    {% assign tuneID = tuneID | plus: 1 %}
{% endfor %}
};

{% assign tuneID = 1 %}
let titleTags = [
    {% for tune in sortedtunes %}{% if tune.mp3_file contains '/mp3/cm/' %}{% continue %}{% endif %}"{{ tune.title | xml_escape }}",
    {% assign tuneID = tuneID | plus: 1 %}{% endfor %}
];
</script>

{% assign tuneID = 1 %}
{% assign my_lt = '>' %}
{% assign my_gt = '<' %}
<datalist id="titleList">
{% for tune in sortedtunes %}{% if tune.mp3_file contains '/mp3/cm/' %}{% continue %}{% endif %}{{ my_gt }}option value="{{ tune.title | xml_escape }}"{{ my_lt }}{{ my_gt }}/option{{ my_lt }}
{% assign tuneID = tuneID | plus: 1 %}{% endfor %}
</datalist>

<div class="showTradle">
    <div id="guess1">1: </div>
    <div id="guess2" class="guessTradleEven">2: </div>
    <div id="guess3">3: </div>
    <div id="guess4" class="guessTradleEven">4: </div>
    <div id="guess5">5: </div>
    <div id="guess6" class="guessTradleEven">6: </div>

    <form onsubmit="return false">
    <!-- On keyup calls the function everytime a key is released -->
    <p class="tradleLabel">Search the list of tunes:</p> 
    <input id="tuneTitle" name="tuneTitle" type="text" list="titleList" onkeyup="tradlePlayer.addTitles(this.value)">
    <input class="filterButton" id="submitSearch" type="submit" name="submit" value="Submit Guess" onclick="tradlePlayer.recordGuess(tuneTitle.value)">
    </form>

    {% include audioPlayerControls.html %}

    <div id="guessStatus" class="showTextInfo">You have 6 guesses!</div>
</div>

<script>
let tuneID = 0;

document.addEventListener("DOMContentLoaded", function (event) {
    tuneID = tradlePlayer.getRandomInt(1, {{ tuneID }});

    tradlePlayer.selectTune(store, tuneID);

    console.log(tuneID);
}, false);
</script>
