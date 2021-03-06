---
layout: page
title: Other Sources
permalink: /other_sources/
---
Here's some other sources of tunes you might find useful. If you look at nothing
else make sure you check out Charlie Montomery's tunes on this website.

Charlie Montgomery:

 * [Charlie Montomery playing his own compositions and some old favourites](/charlie_montgomery/)

Paddy Fahey tunes:

 * [Paddy Fahey tunes compiled by Maria Holohan (PDF - 3M) (just the tunes)]({{ site.tunebooks_host }}/tunebooks/Paddy_Fahey_Tunes_Only_Maria_Holohan.pdf)
 * [The Tune Compositions of Paddy Fahey, Maria Holohon, MA Thesis, 1995 (PDF - 33M)]({{ site.tunebooks_host }}/tunebooks/Paddy_Fahey_Thesis_Maria_Holohan.pdf)

The Northern Fiddler - Music and Musicians of Donegal and Tyrone:

 * [The Northern Fiddler - Online](/northernfiddler/)
 * [The Northern Fiddler (PDF - 11M)- just the tunes!]({{ site.tunebooks_host }}/tunebooks/The_Northern_Fiddler_Tunes_Only.pdf)
 * [The Northern Fiddler, Allen Feldman & Eamonn O'Doherty (PDF - 34M) - complete book ]({{ site.tunebooks_host }}/tunebooks/The_Northern_Fiddler.pdf)

Inishowen Traditional Music Project - Music from the Inishowen Peninsula, Donegal:

 * [Interactive Music Archive 2021](https://inishowenmusicarchive.ie/interactive-archive/)

Sets of tunes put together by Paddy O'Brien:

 * [O'Brien Tunes - Online](/obrientunes/)
 * [Tune Sets Arranged by Paddy O'Brien, Co. Tipperary (PDF) - local copy]({{ site.tunebooks_host }}/tunebooks/obrien.pdf)
 * [Tune Sets Arranged by Paddy O'Brien, Co. Tipperary (PDF) - original](http://www.ceolas.org/pub/tunes/tunes.pdf/POB.pdf)
 
Tommy Potts:

 * [Audio of a set of twelve video clips of Tommie Potts being interview by Mícheál Ó Súilleabháin](/pottstunes/)

Dunedin Fiddle Orchestra:

 * [Details and website ](http://www.kiwifolk.com/dfc/ "WEBSITE")

Sean Manning's Sets (Dunedin):

 * [seansSetBook1704.pdf]({{ site.tunebooks_host }}/tunebooks/seansSetBook1704.pdf "PDF")

Begged Borrowed and Stolen:

 * [bbs.pdf]({{ site.tunebooks_host }}/tunebooks/bbs.pdf "PDF")

Some other tunebooks from early days of ABC i.e. the 1990s:

 * [reavy.pdf]({{ site.tunebooks_host }}/tunebooks/reavy.pdf "PDF")
 * [session1.pdf]({{ site.tunebooks_host }}/tunebooks/session1.pdf "PDF")
 * [session2.pdf]({{ site.tunebooks_host }}/tunebooks/session2.pdf "PDF")

 You can also get copies of the ABC files that were used to generate some of these PDFs:

 * [obrien.abc]({{ site.tunebooks_host }}/tunebooks/obrien.abc "ABC")
 * [seansSetBook1704.abc]({{ site.tunebooks_host }}/tunebooks/seansSetBook1704.abc "ABC")
 * [reavy.abc]({{ site.tunebooks_host }}/tunebooks/reavy.abc "ABC")
 * [session1.abc]({{ site.tunebooks_host }}/tunebooks/session1.abc "ABC")
 * [session2.abc]({{ site.tunebooks_host }}/tunebooks/session2.abc "ABC")

Tunebooks for this site
---------

We've decided to stop producing PDF versions of tunebooks for this site as it was difficult for us to maintain and we felt it led to people printing copies which meant trees were being cut down. 

You can download a file containing all the ABCs used on this site. There are a number of tools you can use to read this file and print copies of tunes from it. We've used [EasyABC](https://sourceforge.net/projects/easyabc/) in the past.

<form id="ABCform">
    <input type="button" class="filterButton" value="Show ABC File" onclick="toggle(this);">
</form>

<div class="formParent abcSource">
    <div id='abcSource' class="abcSource formChild">
        <div class="row">
            <textarea name='abcText' id="abcText" class="abcText"
                rows="16" spellcheck="false"></textarea>
        </div>
        <div class="row">
            <span title="Download the ABC you've entered. Don't lose your work!">
        	    <input value='Download ABC File' type='button' class="filterButton"
                onclick='wssTools.downloadFile("WellingtonIrishSessions.abc", 
                        document.getElementById("abcText").value)' />
            </span>
        </div>
    </div>
</div>

<script>
window.store = {
    {% assign tunes = site.tunes %}
    {% assign sortedtunes = tunes | sort: 'titleID' %}
    {% assign tuneID = 1 %}
    {% for tune in sortedtunes %}
        "{{ tuneID }}": {
            "title": "{{ tune.title | xml_escape }}",
            "tuneID": "{{ tuneID }}",
            "abc": "{{ tune.abc | uri_escape }}"
            }{% unless forloop.last %},{% endunless %}
        {% assign tuneID = tuneID | plus: 1 %}
    {% endfor %}
};
</script>


<!-- https://github.com/cure53/DOMPurify -->
<script src="{{ site.js_host }}/js/purify.min.js"></script>

<script src="{{ site.js_host }}/js/buildABCsource.js"></script>

<script>
function toggle(button) {
    switch (button.value) {
        case "Show ABC File":
            button.value = "Hide ABC File";
            buildABCsource.displayABCsource();      
            document.getElementById('abcSource').style.display= "block" ;
            break;
        case "Hide ABC File":
            button.value = "Show ABC File";
            document.getElementById('abcText').innerHTML = '';
            document.getElementById('abcSource').style.display= "none" ;
            break;
    }
}
</script>
