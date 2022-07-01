---
layout: page
title: Metronome
permalink: /metronome/
---


<div class="setParentOuter" >
    <div id="bpm"></div>
    <div id="startStop"></div>
</div>

Set BPM from 30 to 180

<script>

//Code from https://github.com/padenot/metro/blob/master/metro.js.md

function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

function clampTempo(t) {
    return clamp(t, 30, 300);
}

function getTempo() {
    return clampTempo(parseFloat($("input").value));
}

$ = document.querySelector.bind(document);

var ac = new AudioContext();

function setup() {
    var buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate);
    var channel = buf.getChannelData(0);
    var phase = 0;
    var amp = 1;
    var duration_frames = ac.sampleRate / 50;
    const f = 330;

    for (var i = 0; i < duration_frames; i++) {
        channel[i] = Math.sin(phase) * amp;
        phase += 2 * Math.PI * f / ac.sampleRate;
        if (phase > 2 * Math.PI) {
            phase -= 2 * Math.PI;
        }
        amp -= 1 / duration_frames;
    }

    source = ac.createBufferSource();
    source.buffer = buf;
    source.loop = true;
    source.loopEnd = 1 / (getTempo() / 60);
    source.connect(ac.destination);
    source.start(0);
}

var input = document.createElement("input");
input.type = "number";
input.min = 30;
input.max = 180;
input.step = 1;
input.value = 130;
input.autofocus = true;

var button = document.createElement("button");
button.classList.add("playButton");
button.classList.add("playIcon");


window.onload = function() {
    //document.body.appendChild(input);
    //document.body.appendChild(button);
    
    document.getElementById("startStop").appendChild(button);
    document.getElementById("bpm").appendChild(input);

    for (e of [input, button]) {
        /* CSS-in-js is trendy */
        e.style = "font-size: 2em; display: block; margin: 1em auto;";
    }

    button.onclick = function() {
        if (ac.state == "running") {
            ac.suspend();
            button.classList.remove("pauseIcon");
            button.classList.add("playIcon");
        } else {
            ac.resume();
            button.classList.remove("playIcon");
            button.classList.add("pauseIcon");
        }
    }

    input.onchange = function() {
        setTimeout(function() {
            input.value = getTempo();
        }, 0);
    }
    input.oninput = function() {
        source.loopEnd = 1 / (getTempo() / 60);
    }

    setup();
}
</script>
