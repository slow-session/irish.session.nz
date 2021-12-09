---
layout: null
---

# Session tunes

A collection of tunes played in New Zealand Irish sessions.
## A static website

This is a static website that use Jekyll to process files and generate the
website. Each tune is included as a markdown file in the `_tunes` collection.

An example of the front-matter for Flooded Road to Glenties, in the file `_tunes/flooded-road-to-glenties.md`, is given below:

```
---
title: Flooded Road to Glenties
titleID:    a
key: Bdor
rhythm: reel
mode:
date: 2017-01-12
location: Arrowtown Wellington
notes:
tags: slowsession
regtuneoftheweek:
slowtuneoftheweek: 2017-01-18
mp3_file: /mp3/flooded-road-to-glenties.mp3
mp3_licence: "© Fergal Scahill. All Rights Reserved."
mp3_source: <a href="https://www.facebook.com/FergalScahillMusic/">Fergal Scahill</a>
mp3_url: https://www.facebook.com/video/video.php?v=1189223307840669
alt_mp3_url: https://www.youtube.com/watch?v=zdqWfnJhmgY
source: Wellington
abc_source: The Session
abc_url: https://thesession.org/tunes/3440
abc: |
    X: 1
    T: The Flooded Road To Glenties
    R: reel
    M: 4/4
    L: 1/8
    K: Bdor
    |:A|FB~B2 cfec|Bcec BAFE|FB~B2 ceaf|gfeg ~f3e|
    fafe cfec|~B3A Bcfg|af~f2 fecB|cfec ~B3:|
    |:c|dB~B2 aBgB|fB~B2 ceAc|dB~B2 abaf|gfeg ~f3e|
    fafe Bcec|~B3A Bcef|a3b~f3 f|ecAc ~B3:|
---
```

Use the webpage:

-   <https://irish.session.nz/createMD>

to supply similar information to add new tunes to the collection. Put an MP3 file that matches the one generated by the script in the `mp3` folder on the production site in orderfor the audio to play.

The MP3 files are not stored in GitHub - largish binary blobs aren't a good idea on Github.

## Loading changes to live website

 * Copy the GitHub archive to the production site using "git pull". 
 * Use 'rake build' to construct the html files etc in the '_site' directory. 
 * Copy the contents of '_site' to the relevant webserver directory e.g. /var/www/tune-server, making sure that the ownership is correct e.g. chown -R www-data:www-data /var/www/tune-server 
 * Make sure any MP3 files you need are added to the 'mp3' directory in the /var/www/tune-server/mp3
 
## Open source

This code open source (released under the licence at:

-   <https://github.com/slow-session/irish.session.nz/blob/master/LICENSE>

You are very welcome to copy the code and customise it for your own purposes.
