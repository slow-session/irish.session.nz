---
layout: page-js
title: Metronome
permalink: /metronome/
---


<div class="audioParentOuter">
    <div id="startStop"></div>
    <div class="audioParentInner">
        <div class="audioChildInner">
            <div id="bpmSlider"></div>
        </div>
    </div>
</div>

<script>
// Code from https://github.com/padenot/metro/blob/master/metro.js.md

let minBPM = 30;
let maxBPM = 200;
let initialBPM = 130;

function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

function clampTempo(value) {
    return clamp(parseFloat(value), minBPM, maxBPM);
}

function createSlider() {
    let bpmSlider = document.getElementById("bpmSlider");

    // create the speed slider
    noUiSlider.create(bpmSlider, {
        start: [initialBPM],
        tooltips: [
            wNumb({
                decimals: 0,
                postfix: " bpm",
            }),
        ],
        range: {
            min: minBPM,
            max: maxBPM,
        },
    });

    // add the function that this slider calls on change
    bpmSlider.noUiSlider.on("update", function(value) {
        source.loopEnd = 1 / (clampTempo(value) / 60);
    });
  
}

$ = document.querySelector.bind(document);

var ac = new AudioContext();

function setupMetronome() {
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
    source.loopEnd = 1 / (clampTempo(initialBPM) / 60);
    source.connect(ac.destination);
    source.start(0);
    ac.suspend();

    createSlider();
}

var button = document.createElement("button");
button.classList.add("playButton");
button.classList.add("playIcon");

document.addEventListener("DOMContentLoaded", function (event) {

    setupMetronome();

    document.getElementById("startStop").appendChild(button);
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

});
</script>
