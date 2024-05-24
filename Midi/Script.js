const _ledRec = document.getElementById("_ledRec"); //Red/Orange/Green
const _ledStop = document.getElementById("_ledStop"); //Blue
const _ledTrackOne = document.getElementById("_ledTrackOne"); //Red/Green
const _ledTrackTwo = document.getElementById("_ledTrackTwo"); //Red/Green
const _ledTrackThree = document.getElementById("_ledTrackThree"); //Red/Green
const _ledTrackFour = document.getElementById("_ledTrackFour"); //Red/Green

const _colorRed = "red";
const _colorOrange = "orange";
const _colorGreen = "lime";
const _colorBlue = "blue";

const _trackMute = [false, false, false, false];
let _state = 0; //0=none; 1=rec; 2=overdub; 3=play; 4=stop;
let _mode = 0;
let _selectedTrack = 1;
let _midi = null;

function UpdateUI() {
    if (_mode == 0) {
        _ledTrackOne.style.backgroundColor = (_selectedTrack == 1) ? _colorRed : "transparent";
        _ledTrackTwo.style.backgroundColor = (_selectedTrack == 2) ? _colorRed : "transparent";
        _ledTrackThree.style.backgroundColor = (_selectedTrack == 3) ? _colorRed : "transparent";
        _ledTrackFour.style.backgroundColor = (_selectedTrack == 4) ? _colorRed : "transparent";
    }

    if (_mode == 1) {
        _ledTrackOne.style.backgroundColor = (!_trackMute[0]) ? _colorGreen : "transparent";
        _ledTrackTwo.style.backgroundColor = (!_trackMute[1]) ? _colorGreen : "transparent";
        _ledTrackThree.style.backgroundColor = (!_trackMute[2]) ? _colorGreen : "transparent";
        _ledTrackFour.style.backgroundColor = (!_trackMute[3]) ? _colorGreen : "transparent";
    }

    if (_state == 1) {
        _ledRec.style.backgroundColor = _colorRed;
    }
    else if (_state == 2) {
        _ledRec.style.backgroundColor = _colorOrange;
    }
    else if (_state == 3) {
        _ledRec.style.backgroundColor = _colorGreen;
    }
    else {
        _ledRec.style.backgroundColor = "transparent";
    }

    _ledStop.style.backgroundColor = (_state == 4) ? _colorBlue : "transparent";
}

function ChangeState() {
    if (_state == 0) {
        _state = 1; //Record
    }
    else if (_state == 1) {
        _state = 2; //Overdub
    }
    else if (_state == 2) {
        _state = 3; //Play
    }
    else if (_state == 3) {
        _state = 2; //Overdub
    }
    else if (_state == 4) {
        _state = 3; //Play
    }

    UpdateUI();
}

function Stop() {
    if (_state == 0) {
        return;
    }

    _state = 4;
    UpdateUI();
}

function Clear() {
    Stop();
    _state = 0;

    ChangeMode(0);
    SelectTrack(1);

    //Unmute any tracks
    for (let i = 0; i < _trackMute.length; i++) {
        if (_trackMute[i]) {
            _trackMute[i] = false;
        }
    }

    UpdateUI();
}

//-1=auto; 0=rec; 1=play
function ChangeMode(i = -1) {
    if (i == -1) { //-1 = auto change
        if (_mode == 0) {
            _mode = 1;
        }
        else {
            _mode = 0;
        }
    }
    else {
        _mode = i;
    }

    UpdateUI();
}

function SelectTrack(i = 1) {
    _selectedTrack = i;
    UpdateUI();
}

function ToggleMuteTrack(i = 1) {
    _trackMute[i - 1] = !_trackMute[i - 1];
    UpdateUI();
}

function getMIDIMessage(m) {
    let command = m.data[0]; //144=NoteOn; 128=NoteOff;
    let note = m.data[1]; //Note number

    switch (note) {
        case 53:
            SelectTrack(1);
            break;
        case 55:
            SelectTrack(2);
            break;
        case 57:
            SelectTrack(3);
            break;
        case 59:
            SelectTrack(4);
            break;
    }
}

window.onload = () => {
    if (navigator.requestMIDIAccess()) {
        console.log("Browser supports midi");
        navigator.requestMIDIAccess().then(
            (m) => {
                console.log(m);
                _midi = m.inputs;
                for (let i of m.inputs.values()) {
                    i.onmidimessage = getMIDIMessage;
                }
            },
            () => {
                console.log("Could not access devices");
            }
        );
    }
    else {
        console.log("Midi not supported");
    }

    Clear();

    document.getElementById("_btnClear").addEventListener("click", () => {
        Clear();
    });

    document.getElementById("_btnRec").addEventListener("click", () => {
        ChangeState();
    });

    document.getElementById("_btnStop").addEventListener("click", () => {
        Stop();
    });

    document.getElementById("_btnMode").addEventListener("click", () => {
        ChangeMode();
    });

    document.getElementById("_btnTrackOne").addEventListener("click", () => {
        if (_mode == 0) {
            SelectTrack(1);
        }
        else {
            ToggleMuteTrack(1);
        }
    });

    document.getElementById("_btnTrackTwo").addEventListener("click", () => {
        if (_mode == 0) {
            SelectTrack(2);
        }
        else {
            ToggleMuteTrack(2);
        }
    });

    document.getElementById("_btnTrackThree").addEventListener("click", () => {
        if (_mode == 0) {
            SelectTrack(3);
        }
        else {
            ToggleMuteTrack(3);
        }
    });

    document.getElementById("_btnTrackFour").addEventListener("click", () => {
        if (_mode == 0) {
            SelectTrack(4);
        }
        else {
            ToggleMuteTrack(4);
        }
    });
};