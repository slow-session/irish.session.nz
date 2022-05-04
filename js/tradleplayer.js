/*
 * Audio controls for the browser audio player
 *
 * Version: 2.1
 * Date: 25 Nov 2020
 *
 * Developed as part of websites for https://dev.session.nz
 * by Ted Cizadlo and Andy Linton
 * Code available at:
 * https://github.com/slow-session/dev.session.nz/blob/master/js/tradlePlayer.js
 * Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) Licence.
 */
"use strict";

const tradlePlayer = (function () {

    let endSegment = {
        endTime: undefined,
        get currentTime() {
            return this.endTime;
        },
        set currentTime(val) {
            this.endTime = Number(val).toFixed(1);
            //console.log("setting endTime:", this.endTime);
        }
    };

    let guessCount = {
        guess: undefined,
        get currentGuess() {
            return this.guess;
        },
        set currentGuess(val) {
            this.guess = Number(val).toFixed();
            //console.log("setting guess:", this.guess);
        }
    };

    guessCount.guess = 1;
    let tradleTitle = '';
    let tradleURL = '';

    // Used on tune pages to create an MP3 player and display the ABC
    function selectTune(storeID, tuneID) {
        let item = storeID[tuneID];

        tradleTitle = item.title;
        tradleURL = item.url;
        console.log(tradleTitle, tradleURL);
        
        let pageMP3player = document.getElementById("pageMP3player");
        // make the MP3 player
        if (pageMP3player && item.mp3.includes("mp3")) {
            displayMP3player(pageMP3player, tuneID, item.mp3);
        } else {
            // no recording available
            if (pageMP3player) {
                let recordingMessage = "<fieldset><strong>A recording for this tune is not available.</strong></fieldset>";

                pageMP3player.style.overflow = "auto";
                pageMP3player.innerHTML = recordingMessage;
            }
        }
    }

    function displayMP3player(playerdivID, tuneID, mp3) {
        // build the MP3 player for each tune
        playerdivID.innerHTML = `
        <div class="audioParentOuter">
            <!-- Col 1 - play button -->
            <button id="playButtonMP3-${tuneID}" class="playButton playpauseIcon" aria-label="play/pause button" 
                onclick="tradlePlayer.playAudio(${tuneID})"></button>
            <div class="audioChildInner">
            <p>Press the Play/Pause button to hear <span id="fragmentLength">${guessCount.guess} second</span> of the tune</p>
            </div>
        </div>`;

        //console.log("Loading: " + mp3)
        OneAudioPlayer.src = mp3;
        OneAudioPlayer.load();
    }

    function addTitles(value) {
	    // set datalist empty at the start of function
	    //if we skip this step, same name will be repeated
        document.getElementById("titleList").innerHTML = '';
	
	    let l = value.length;
	    //input query length
	    for (let i = 0; i < titleTags.length; i++) {
		    if(((titleTags[i].toLowerCase()).indexOf(value.toLowerCase()))>-1)
		    {
			    //comparing if input string is existing in titleTags[i] string

			    let node = document.createElement("option");
			    let val = document.createTextNode(titleTags[i]);
			    node.appendChild(val);

			    document.getElementById("titleList").appendChild(node);
			    //creating and appending new elements in data list
		    }
	    }
    }

    function recordGuess(title){
        if (title === "") {
            //return;
            title = "Skip";
        }
            
        if (guessCount.guess < 6) {

            document.getElementById('guess' + guessCount.guess).innerHTML += title;
            if (store[tuneID].title === title) {
                document.getElementById('guessStatus').innerHTML = `<p>Well Done!</p><p>The tune is <a href="${tradleURL}">${tradleTitle}</a> - check it out on the NZ Irish Sessions site.</p>
                <input type="button" class="filterButton" onclick="location.reload()" value="Get New Tune">`;
                guessCount.guess = 6;
                return;
            } else {
                document.getElementById('guessStatus').innerHTML = 'Try again - you have used ' + guessCount.guess + ' of your 6 guesses';
                tuneTitle.value = '';
            }
        } else if (guessCount.guess == 6) {
            document.getElementById('guess' + guessCount.guess).innerHTML += title;
            if (store[tuneID].title === title) {
                document.getElementById('guessStatus').innerHTML = `<p>Well Done!</p><p>The tune is <a href="${tradleURL}">${tradleTitle}</a> - check it out on the NZ Irish Sessions site.</p>
                <input type="button" class="filterButton" onclick="location.reload()" value="Get New Tune">`;
                return;
            } else {
                document.getElementById('guessStatus').innerHTML = `<p>Game over!</p><p>The tune was <a href="${tradleURL}">${tradleTitle}</a> - check it out on the NZ Irish Sessions site.</p>
                <input type="button" class="filterButton" onclick="location.reload()" value="Get New Tune">`;
                tuneTitle.value = '';
            }
        } else {
            return;
        }
        guessCount.guess = guessCount.guess + 1;
        document.getElementById('fragmentLength').innerHTML = `${guessCount.guess} seconds`;
    }

    // plays the MP3 when the play button is pressed
    function playAudio(tuneID) {
        let playButton = document.getElementById(`playButtonMP3-${tuneID}`);
        
        if (playButton.classList.contains("playpauseIcon")) {
            // time to play this tune
            // These event listeners keep track of the cursor and restarts the loop
            // when needed - we don't need to set them elsewhere
             
            OneAudioPlayer.addEventListener("timeupdate", positionUpdate);
                    
            let playPromise = OneAudioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                        // Automatic playback started!
                        // Show playing UI.
                    })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                        console.error(error);
                    });
            }
            // Get the position parameters from the noUiSlider controls
            //console.log("guess: ", guessCount.guess);
            endSegment.currentTime = guessCount.guess;
            //console.log(endSegment.currentTime);

            //playButton.classList.remove("playIcon");
            //playButton.classList.add("pauseIcon");
        }
    }

    function positionUpdate() {
        if (OneAudioPlayer.currentTime >= endSegment.currentTime) {
            //console.log("End of Segment: " + OneAudioPlayer.currentTime);
            OneAudioPlayer.currentTime = 0;
            OneAudioPlayer.pause();
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        playAudio: playAudio,
        selectTune: selectTune,
        addTitles: addTitles,
        recordGuess: recordGuess,
        getRandomInt, getRandomInt,
    };
})();

if (typeof module !== "undefined" && module.exports) {
    module.exports = tradlePlayer;
}
