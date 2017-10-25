var i;
var arrayOfStrings;
var index;
var newStr;
var inputVal; // the original Hebrew text
var engVal; // the transliterated text
var outputVal; // the text to be printed
var dagesh = '9';
var metheg = '5';
var methegOrAthnah = /1|5/;

/* These are the Hebrew Characters and their corresponding transliterated character */
const hebChars = {
  // preserves white space
  ' ':' ',
  // consonants
  'א':'ʾ',
  'ב':'b',
  'ג':'g',
  'ד':'d',
  'ה':'h',
  'ו':'w',
  'ז':'z',
  'ח':'ḥ',
  'ט':'ṭ',
  'י':'y',
  'כ':'k',
  'ך':'k',
  'ל':'l',
  'מ':'m',
  'ם':'m',
  'נ':'n',
  'ן':'n',
  'ס':'s',
  'ע':'ʿ',
  'פ':'p',
  'ף':'p',
  'צ':'ṣ',
  'ץ':'ṣ',
  'ק':'q',
  'ר':'r',
  'ש':'š',
  '\u05C1':'8',
  '\u05C2':'7',
  '\uFB2A':'š', //ligature for שׁ
  '\uFB2B':'ś', //ligature for שׂ
  'ת':'t',
  // vowels
  '\u05B0':'ǝ', //shewa
  '\u05B1':'ĕ', //hataf segol
  '\u05B2':'ă', //hataf patach
  '\u05B3':'ŏ', //hataf qamats
  '\u05B4':'i', //hiriq
  '\u05B5':'ē', //tsere
  '\u05B6':'e', //segol
  '\u05B7':'a', //patach
  '\u05B8':'ā', //qamats
  '\u05B9':'ō', //holam
  '\u05BA':'ō', //this is the codepoint for a holam on a const waw, but it is rarely used
  '\u05BB':'u', //qibbuts
  '\u05BC': dagesh,
  '\u05BD':metheg,
  '\u05BE':'-', // maqqef
  '\u05BF':'', // rafe
  '\u05C7':'o', //qamets hatuf/qatan. Not used often, most use a qamats instead
  // extra marks and cantillations
  '\u0591':'1', //athna
  '\u0592':'',
  '\u0593':'',
  '\u0594':'',
  '\u0595':'',
  '\u0596':'',
  '\u0597':'',
  '\u0598':'',
  '\u0599':'',
  '\u059A':'',
  '\u059B':'',
  '\u059C':'',
  '\u059D':'',
  '\u059E':'',
  '\u059F':'',
  '\u05A0':'',
  '\u05A1':'',
  '\u05A2':'',
  '\u05A3':'',
  '\u05A4':'',
  '\u05A5':'',
  '\u05A6':'',
  '\u05A7':'',
  '\u05A8':'',
  '\u05A9':'',
  '\u05AA':'',
  '\u05AB':'',
  '\u05AC':'',
  '\u05AD':'',
  '\u05AE':'',
  '\u05AF':'',
  '\u05C3':'',
};

/* This function transilerates the text in a tit-for-tat manner with the Hebrew characters. The var engVal represents this transliteration (e.g. 'ה' > 'h'; 'ב' > 'b')
*/
function transliterateText () {
  inputVal = $("#input").val();
  engVal = inputVal.replace(/[\u0591-\u05F4, \uFB1D-\uFB4F]/gu, i => hebChars[i]);
  console.log("This is the 1st transliteration: " + engVal);
  outputVal = engVal;
}

/************************************************************
******************** Šin or śin *****************************
************************************************************/

var šinDot = '8';
var śinDot = '7';
var śin = /š7/;

function changeŠin () {
  arrayOfStrings = engVal.split(šinDot);
  šinTrans = arrayOfStrings.join('');
  console.log("If a šin and dot is found it becomes: " + šinTrans);
  engVal = šinTrans;
}

function changeŚin () {
  arrayOfStrings = engVal.split(śin);
  śinTrans = arrayOfStrings.join('ś');
  console.log("If a śin and dot is found it becomes: " + śinTrans);
  engVal = śinTrans;
}

function isŚinŠin () {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'š' && engVal.charAt(i + 1) === šinDot) {
      changeŠin ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'š' && engVal.charAt(i + 1) === śinDot) {
      changeŚin ();
      outputVal = engVal;
    } else {
      outputVal = engVal;
    }
  }
}

/************************************************************
******************** He as a Mater **************************
************************************************************/

var aMater = /āh(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/;
var materTrans;

function changeHeMater () {
  arrayOfStrings = engVal.split(aMater);
  materTrans = arrayOfStrings.join('â');
  console.log("If a he-mater is found it becomes: " + materTrans);
  engVal = materTrans;
}

function isHeMater () {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'ā' && methegOrAthnah.test(engVal.charAt(i + 1))) {
      index = engVal.indexOf(engVal.charAt(i+1), i+1);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      i = 0;
    } if (engVal.charAt(i) === 'ā' && engVal.charAt(i + 1) === 'h' /*&& / /.test(engVal.charAt(i+2))*/ ) {
      changeHeMater ();
      outputVal = engVal;
    } else {
      outputVal = engVal;
    }
  }
}

/************************************************************
******************** He with a Mappiq ***********************
************************************************************/

var aMaterMappiq = /āh9/; // this indicates the sequence of āh+mappiq
var mappiqTrans;

function changeMappiq () {
  arrayOfStrings = engVal.split(aMaterMappiq);
  mappiqTrans = arrayOfStrings.join('āh');
  console.log("If a he w/ a mappiq is found it becomes: " + mappiqTrans);
  engVal = mappiqTrans;
}

function isHeMappiq() {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'ā' && engVal.charAt(i + 1) === 'h' && engVal.charAt(i + 2) === dagesh ) {
      changeMappiq ();
      outputVal = engVal;
    } else {
      outputVal = engVal;
    }
  }
}

/************************************************************
********************  Yod as a Mater ************************
************************************************************/

var hiriqYod = /iy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/;
var hiriqYodTrans;
var tsereYod = /ēy(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/;
var tsereYodTrans;
var segolYod = /ey(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|ō|u|9)/;
var segolYodTrans;

function changeHiriqYod () {
  arrayOfStrings = engVal.split(hiriqYod);
  hiriqYodTrans = arrayOfStrings.join('î');
  console.log("If a hiriq yod is found it becomes: " + hiriqYodTrans);
  engVal = hiriqYodTrans;
}

function changeTsereYod () {
  arrayOfStrings = engVal.split(tsereYod);
  tsereYodTrans = arrayOfStrings.join('ê');
  console.log("If a tsere yod is found it becomes: " + tsereYodTrans);
  engVal = tsereYodTrans;
}

function changeSegolYod () {
  arrayOfStrings = engVal.split(segolYod);
  segolYodTrans = arrayOfStrings.join('ê');
  console.log("If a hiriq yod is found it becomes: " + segolYodTrans);
  engVal = segolYodTrans;
}

function isYodMater () {
  for (i = 0; i < engVal.length; i++) {
    if ( engVal.charAt(i) === 'i' && (engVal.charAt(i + 1) === 'y') && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 2)) ) ) {
      changeHiriqYod ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'i' && methegOrAthnah.test(engVal.charAt(i+1)) && engVal.charAt(i + 2) === 'y' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 3)) ) ) {
      index = engVal.indexOf(engVal.charAt(i+1), i+1);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      changeHiriqYod ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'ē' && engVal.charAt(i + 1) === 'y' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 2)) ) ) {
      changeTsereYod ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'ē' && methegOrAthnah.test(engVal.charAt(i+1)) && engVal.charAt(i + 2) === 'y' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 3)) ) ) {
      index = engVal.indexOf(engVal.charAt(i+1), i+1);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      changeTsereYod ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'e' && engVal.charAt(i + 1) === 'y' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 2)) )) {
      changeSegolYod ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'e' && methegOrAthnah.test(engVal.charAt(i+1)) && engVal.charAt(i + 2) === 'y' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 3)) ) ) {
      index = engVal.indexOf(engVal.charAt(i+1), i+1);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      changeSegolYod ();
      outputVal = engVal;
    } else {
      outputVal = engVal;
    }
  }
}

/************************************************************
******************** Waw as a Mater *************************
************************************************************/

var holamWawA = /wō(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|9)/;
var holamWawATrans;
var holamWawB = /ōw(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|u|9)/;
var holamWawBTrans;
var shureqWawA = /w9(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/;
var shureqWawATrans;
var shureqWawB = /9w(?!ǝ|ĕ|ă|ŏ|i|ē|e|a|ā|â|o|ô|u|û)/;
var shureqWawBTrans;

function changeHolamWawA () {
  arrayOfStrings = engVal.split(holamWawA);
  holamWawATrans = arrayOfStrings.join('ô');
  console.log("If a holam waw is found it becomes: " + holamWawATrans);
  engVal = holamWawATrans;
}

function changeHolamWawB () {
  arrayOfStrings = engVal.split(holamWawB);
  holamWawBTrans = arrayOfStrings.join('ô');
  console.log("If a holam waw is found it becomes: " + holamWawBTrans);
  engVal = holamWawBTrans;
}

function changeShureqWawA () {
  arrayOfStrings = engVal.split(shureqWawA);
  shureqWawATrans = arrayOfStrings.join('û');
  console.log("If a shureq waw is found it becomes: " + shureqWawATrans);
  engVal = shureqWawATrans;
}

function changeShureqWawB () {
  arrayOfStrings = engVal.split(shureqWawB);
  shureqWawBTrans = arrayOfStrings.join('û');
  console.log("If a hiriq yod is found it becomes: " + shureqWawBTrans);
  engVal = shureqWawBTrans;
}

function isWawMater () {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'w' && methegOrAthnah.test(engVal.charAt(i + 1))) {
      index = engVal.indexOf(engVal.charAt(i+1), i+1);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      i = 0;
    } if ( engVal.charAt(i) === 'w' && engVal.charAt(i + 1) === 'ō' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u|9/.test(engVal.charAt(i + 2)) ) &&
    !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|u/.test(engVal.charAt(i - 1)) )) {
      changeHolamWawA ();
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'ō' && methegOrAthnah.test(engVal.charAt(i + 1))) {
      index = engVal.indexOf(engVal.charAt(i+1), i+1);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      i = 0;
    } if (engVal.charAt(i) === 'ō' && engVal.charAt(i + 1) === 'w' && !(/ǝ|ĕ|ă|ŏ|a|ā|e|ē|i|o|ō|u|9/.test(engVal.charAt(i + 2)) ) ) {
      changeHolamWawB ();
      outputVal = engVal;
    } if (engVal.charAt(i) === 'w' && engVal.charAt(i + 1) === '9' && !/ǝ|ĕ|ă|ŏ|a|ā|â|e|ē|i|o|ō|ô|u|ū/.test(engVal.charAt(i + 2))  ) {
      console.log(i);
      changeShureqWawA ();
      outputVal = engVal;
    } else {
      outputVal = engVal;
    }
  }
}

/************************************************************
******************** Shewa Naʿ or Naḥ ***********************
************************************************************/

function isShewaSilent ( ) {
  for ( i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'ǝ' && /s|ṣ|š|ś|q|n|m|l|w|y/.test(engVal.charAt(i - 1))&& /ǝ|a|e|i|u|o/.test(engVal.charAt(i - 2)) && /w/.test(engVal.charAt(i - 3)) ){
      // tests for SQeNeM LeVY letters in wayyiqtol forms
      outputVal = engVal;
    }
    else if ( engVal.charAt(i) === 'ǝ' && /ǝ|a|e|i|u|o/.test(engVal.charAt(i - 2)))
    {
      // tests for basic shewa preceded by short vowels
      index = engVal.indexOf('ǝ', i);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      console.log("If a silent shewa is found it becomes: " + newStr);
      engVal = newStr;
      outputVal = engVal;
    }
    else if (engVal.charAt(i) === 'ǝ' && /b|g|d|k|p|t/.test(engVal.charAt(i+1)) && engVal.charAt(i+2) === dagesh)
    {
      // tests for silent shewa as indicated by BeGaDKePaT letter
      index = engVal.indexOf('ǝ', i);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      console.log("If a silent shewa is found it becomes: " + newStr);
      engVal = newStr;
      outputVal = engVal;
    }
    else if ( engVal.charAt(i) === 'ǝ' && engVal.charAt(i+1) === ' ' )
    {
      // tests for shewa at end of the word
      index = engVal.indexOf('ǝ', i);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index + 1, );
      console.log("If an end shewa is found it becomes: " + newStr);
      engVal = newStr;
      outputVal = engVal;
    }
    else
    {
      outputVal = engVal;
    }
  }
}

/************************************************************
******************** Qamats Qatan ***************************
************************************************************/

function isQamatsQatan () {
    for (i = 0; i < engVal.length; i++) {
      if ( engVal.charAt(i) === 'ā' && engVal.charAt(i + 2) === 'ŏ') {
        index = engVal.indexOf('ā', i);
        newStr = engVal.substr(0, index) + 'o' + engVal.substr(index+1, );
        console.log("If a qamats qatan is found it becomes: " + newStr);
        engVal = newStr;
        outputVal = engVal;
      }
      else if (engVal.charAt(i) === 'ā' && engVal.charAt(i + 2) === '-') {
        index = engVal.indexOf('ā', i);
        newStr = engVal.substr(0, index) + 'o' + engVal.substr(index+1, );
        console.log("If a qamats qatan is found it becomes: " + newStr);
        engVal = newStr;
        outputVal = engVal;
      }
      else if (engVal.charAt(i) === 'ā' && engVal.charAt(i + 2) === 'ǝ' && engVal.charAt(i + 4) === 'û') {
        outputVal = engVal;
      }
      else if (engVal.charAt(i) === 'ā' && !/ǝ|ĕ|ă|ŏ|a|ā|e|ē|ê|i|î|o|ō|ô|u|ū|û| |y/.test(engVal.charAt(i + 1))
      && !/ǝ|ĕ|ă|ŏ|a|ā|e|ē|ê|i|î|o|ō|ô|u|ū|û| |w/.test(engVal.charAt(i + 2)) ) {
        // tests if there is a closed syllable, may have issues
        index = engVal.indexOf('ā', i);
        newStr = engVal.substr(0, index) + 'o' + engVal.substr(index+1, );
        console.log("If a qamats qatan is found it becomes: " + newStr);
        engVal = newStr;
        outputVal = engVal;
      }
      else
      {
        outputVal = engVal;
      }
    }
  }

/************************************************************
******************** Doubling *******************************
************************************************************/

function isDoubling () {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === '9' && engVal.charAt(i-2) === '5') {
      index = engVal.indexOf(engVal.charAt(i-2), i-2);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      engVal = newStr;
      i = 0;
    } if (engVal.charAt(i) === '9' && /a|ā|e|ē|i|î|u|û|o|ô/.test(engVal.charAt(i-2)) ) {
      index = engVal.indexOf('9', i);
      newStr = engVal.substr(0, index) + engVal.charAt(index-1) + engVal.substr(index+1, );
      console.log("If a dagesh forte is found it becomes: " + newStr);
      engVal = newStr;
      outputVal = engVal;
    } else if (engVal.charAt(i) === '9') {
      index = engVal.indexOf('9', i);
      newStr = engVal.substr(0, index) + '' + engVal.substr(index+1, );
      console.log("If a dagesh lene is found it becomes: " + newStr);
      engVal = newStr;
      outputVal = engVal;
    }
  }
}

/************************************************************
******************** Furtive Patach *************************
************************************************************/

var gutturals = /h|ḥ|ʿ/;

function isFurtivePatach () {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'a' && gutturals.test(engVal.charAt(i-1)) && /e|ē|ê|i|î|u|û|o|ō|ô/.test(engVal.charAt(i-2)) && engVal.charAt(i+1) === ' ') {
      index = engVal.indexOf(engVal.charAt(i-1), i-1);
      newStr = engVal.substr(0, index) + 'a' + engVal.substr(index, 1 ) + '' + engVal.substr(index + 2, );
      console.log("If a furtive patach is found it becomes: " + newStr);
      engVal = newStr;
      outputVal = engVal;
    }
  }
}

/************************************************************
********************** Cleanup ******************************
************************************************************/

var digit = /\d/; //any non specific digit = cantillation mark

function cleanup () {
  for (i = 0; i < engVal.length; i++) {
    if (digit.test(engVal.charAt(i)) ) {
      arrayOfStrings = engVal.split(digit);
      var cleanup = arrayOfStrings.join('');
      console.log("The cleanup becomes " + cleanup);
      engVal = cleanup;
      outputVal = engVal;
    } else {
      outputVal = engVal;
    }
  }
}

/************************************************************
********************** isYHWH ******************************
************************************************************/

function isYHWH () {
  for (i = 0; i < engVal.length; i++) {
    if (engVal.charAt(i) === 'y' && engVal.charAt(i + 1) === 'ǝ' && engVal.charAt(i + 2) === 'h' && engVal.charAt(i + 3) === 'w' && engVal.charAt(i + 4) === 'â') {
      index = engVal.indexOf('y', i);
      newStr = engVal.substr(0, index) + 'yhwh' + engVal.substr(index+5, );
      console.log("The divine name is changed " + newStr);
      engVal = newStr;
      outputVal = engVal;
    } else if (engVal.charAt(i) === 'y' && engVal.charAt(i + 1) === 'h' && engVal.charAt(i + 2) === 'w' && engVal.charAt(i + 3) === 'â') {
      index = engVal.indexOf('y', i);
      newStr = engVal.substr(0, index) + 'yhwh' + engVal.substr(index+4, );
      console.log("The divine name is changed " + newStr);
      engVal = newStr;
      outputVal = engVal;
    }else {
      outputVal = engVal;
    }
  }
}

/************************************************************
************* THIS IS WHERE THE MAGIC HAPPENS ***************
************************************************************/

// test executes all the above functions
function test () {
  transliterateText();
  isŚinŠin();
  isHeMater();
  isHeMappiq();
  isYodMater();
  isWawMater();
  isShewaSilent();
  isQamatsQatan();
  isDoubling();
  isFurtivePatach();
  cleanup();
  isYHWH();
  outputVal = $('#output').val(outputVal);
}

$("#input_button").click(test);
