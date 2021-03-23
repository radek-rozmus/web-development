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
        this.createChannels = function () {
            _this.channel1 = new Channel("channel1", _this.drumkit, _this);
        };
        this.playChosenSound = function (e) {
            _this.sounds.forEach(function (sound) {
                if (e.key.toLowerCase() === sound.key) {
                    sound.sound.playSound();
                }
            });
        };
        this.playChosenSoundByKey = function (key) {
            _this.sounds.forEach(function (sound) {
                if (key.toLowerCase() === sound.key) {
                    sound.sound.playSound();
                }
            });
        };
        document.body.addEventListener('keypress', function (e) {
            var key = e.key;
            var time = e.timeStamp;
            _this.playChosenSound(e);
            _this.channel1.recording.push({ key: key, time: time });
        });
        this.createSoundButtons();
        this.createChannels();
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
        this.soundButton.addEventListener("click", function (e) {
            var key = _this.key;
            var time = e.timeStamp;
            var sound = _this.sound;
            _this.sound.playSound();
            context.channel1.recording.push({ key: key, time: time });
        });
        whereButton.appendChild(this.soundButton);
    }
    return SoundButton;
}());
var Channel = /** @class */ (function () {
    function Channel(name, where, context) {
        var _this = this;
        this.recording = [];
        this.playChannel = function () {
            _this.recording.forEach(function (obj) {
                setTimeout(function () { return _this.context.playChosenSoundByKey(obj.key); }, obj.time);
            });
        };
        this.name = name;
        this.context = context;
        this.playChannelButton = document.createElement('button');
        this.playChannelButton.textContent = "Play" + this.name;
        this.playChannelButton.addEventListener('click', function () { return _this.playChannel(); });
        where.appendChild(this.playChannelButton);
    }
    return Channel;
}());
var app = new App();
