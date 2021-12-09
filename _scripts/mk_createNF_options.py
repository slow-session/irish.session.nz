#!/usr/bin/env python3
# encoding: utf-8

import html
import os
import re
import sys
#
# You will need to change these variables to
# match your directory structure
#
from pathlib import Path

def usage():
    sys.stdout = sys.stderr
    print('Usage: {0} <archiveName> '.format(sys.argv[0]))
    sys.exit(2)

if len(sys.argv) != 2:
    usage()

archiveName = sys.argv[1]

homeDir = str(Path.home())

tunesDir = homeDir + '/GitHub/' + archiveName + '/_northernfiddler'
optionsFile = homeDir + '/GitHub/' + archiveName + '/_includes/createNF_options.html'

cleanr = re.compile('<.*?>')

def cleanhtml(raw_html):
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext

rhythmDict = {}

#
# Get the data from the _northernfiddler MD files
#
os.chdir(tunesDir)
with open(optionsFile, 'w') as outfile:
    for file in os.listdir("."):
        if file.endswith(".md"):
            with open(tunesDir + '/' + file, 'r') as infile:
                outline = ''
                for line in infile:
                    if line.startswith('rhythm:'):
                        rhythm = line.replace('rhythm:', '').strip()
                        if rhythm.count(","):
                            continue
                        if rhythm:
                            rhythmDict[cleanhtml(rhythm.replace('"', ''))] = rhythm

    #
    # Output the form to the file
    #
    outfile.write('<!-- This code was auto-generated using the script: -->\n')
    outfile.write('<!-- ' + os.path.basename(sys.argv[0])  +' -->\n')
    outfile.write('<!-- Any changes WILL be overwritten! -->\n\n')
    outfile.write("""
<form id="createMD" method="get">
    <label>Title:<sup>*</sup></label>
    <input type="text" id="title-box" name="title" value="">

    <input type="hidden" id="titleID-box" name="titleID" value=""><br />

    <label>Musician:<sup>*</sup></label>
    <input type="text" id="mp3_source-box" name="mp3_source" value="">

    <label>Page:<sup>*</sup></label>
    <input type="number" id="page-box" name="page" value="">

    <label>Key:<sup>*</sup></label>
    <input type="text" id="key-box" name="key" list="key" value="">
    <datalist id="key">
        <option value="Ddor">Ddor</option>
        <option value="Dmaj">Dmaj</option>
        <option value="Dmix">Dmix</option>
        <option value="Gdor">Gdor</option>
        <option value="Gmaj">Gmaj</option>
        <option value="Gmix">Gmix</option>
        <option value="Ador">Ador</option>
        <option value="Amaj">Amaj</option>
        <option value="Amix">Amix</option>
        <option value="Bdor">Bdor</option>
        <option value="Bmix">Bmix</option>
        <option value="Cmaj">Cmaj</option>
        <option value="Edor">Edor</option>
        <option value="Fmaj">Fmaj</option>
    </datalist>

    <label>Rhythm:<sup>*</sup></label>
    <input type="text" id="rhythm-box" name="rhythm" list="rhythm" value="">
    <datalist id="rhythm">
""")

    for key in sorted(rhythmDict.keys()):
        outfile.write('        <option value="' + html.escape(rhythmDict[key], quote=True) + '">' + key + '</option>\n')

    outfile.write("""
    </datalist>

    <label>Notes:</label>
    <input type="text" id="notes-box" name="notes" value="">

    <input type="hidden" id="date-box" name="date" value=""><br />    
    
    <p></p>
    <hr>
    
    <input type="hidden" id="abc-source-box" name="abc_source" value="The Northern Fiddler"><br />
    
    <label>ABC:<sup>*</sup></label>
    <textarea id="abc-box" name="abc" class="abcText" rows="13" spellcheck="false"></textarea>

    <input type="button" class="filterButton" onclick="wssTools.showNFform('createMD', 'mdTextArea')" value="Show MD File">
</form>
""")

    outfile.write('<!-- End of ' + os.path.basename(sys.argv[0])  +' code -->\n')
