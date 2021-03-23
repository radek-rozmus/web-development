var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.root = document.getElementById('root');
        this.drumkit = document.getElementById('drumkit');
        this.sounds = [];
        //create sound buttons
        this.createSoundButtons = function () {
            _this.boomSoundButton = new SoundButton("boom", "q", "./sounds/boom.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.boomSoundButton.key, sound: _this.boomSoundButton.sound });
            _this.clapSoundButton = new SoundButton("clap", "w", "./sounds/clap.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.clapSoundButton.key, sound: _this.clapSoundButton.sound });
            _this.hihatSoundButton = new SoundButton("hihat", "e", "./sounds/hihat.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.hihatSoundButton.key, sound: _this.hihatSoundButton.sound });
            _this.kickSoundButton = new SoundButton("kick", "r", "./sounds/kick.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.kickSoundButton.key, sound: _this.kickSoundButton.sound });
            _this.openhatSoundButton = new SoundButton("openhat", "t", "./sounds/openhat.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.openhatSoundButton.key, sound: _this.openhatSoundButton.sound });
            _this.rideSoundButton = new SoundButton("ride", "a", "./sounds/ride.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.rideSoundButton.key, sound: _this.rideSoundButton.sound });
            _this.snareSoundButton = new SoundButton("snare", "s", "./sounds/snare.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.snareSoundButton.key, sound: _this.snareSoundButton.sound });
            _this.tinkSoundButton = new SoundButton("tink", "d", "./sounds/tink.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.tinkSoundButton.key, sound: _this.tinkSoundButton.sound });
            _this.tomSoundButton = new SoundButton("tom", "f", "./sounds/tom.wav", _this.drumkit, _this.root, _this);
            _this.sounds.push({ key: _this.tomSoundButton.key, sound: _this.tomSoundButton.sound });
        };
        this.createSoundButtons();
    }
    return App;
}());
var Sound = /** @class */ (function () {
    function Sound(name, key, path, where) {
        var _this = this;
        this.playSound = function () {
            _this.sound.currentTime = 0;
            _this.sound.play();
        };
        this.name = name;
        this.key = key;
        this.path = path;
        this.sound = document.createElement('audio');
        this.sound.dataset.sound = name;
        this.sound.src = path;
        where.appendChild(this.sound);
    }
    return Sound;
}());
var SoundButton = /** @class */ (function () {
    function SoundButton(name, key, path, whereButton, whereAudio, context) {
        var _this = this;
        this.key = key;
        this.sound = new Sound(name, key, path, whereAudio);
        this.soundButton = document.createElement('button');
        this.soundButton.textContent = this.key;
        this.soundButton.addEventListener("click", function () { return _this.sound.playSound(); });
        whereButton.appendChild(this.soundButton);
    }
    return SoundButton;
}());
var app = new App();
