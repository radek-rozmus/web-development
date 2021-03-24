var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.root = document.getElementById('root');
        this.drumkit = document.getElementById('drumkit');
        this.sounds = [];
        //create sound buttons
        this.createSoundButtons = function () {
            var row1 = document.getElementById('row1');
            var row2 = document.getElementById('row2');
            var row3 = document.getElementById('row3');
            _this.boomSoundButton = new SoundButton("boom", "q", "./sounds/boom.wav", row1, _this.root, _this);
            _this.sounds.push({ key: _this.boomSoundButton.key, sound: _this.boomSoundButton.sound });
            _this.clapSoundButton = new SoundButton("clap", "w", "./sounds/clap.wav", row1, _this.root, _this);
            _this.sounds.push({ key: _this.clapSoundButton.key, sound: _this.clapSoundButton.sound });
            _this.hihatSoundButton = new SoundButton("hihat", "e", "./sounds/hihat.wav", row1, _this.root, _this);
            _this.sounds.push({ key: _this.hihatSoundButton.key, sound: _this.hihatSoundButton.sound });
            _this.kickSoundButton = new SoundButton("kick", "r", "./sounds/kick.wav", row2, _this.root, _this);
            _this.sounds.push({ key: _this.kickSoundButton.key, sound: _this.kickSoundButton.sound });
            _this.openhatSoundButton = new SoundButton("openhat", "t", "./sounds/openhat.wav", row2, _this.root, _this);
            _this.sounds.push({ key: _this.openhatSoundButton.key, sound: _this.openhatSoundButton.sound });
            _this.rideSoundButton = new SoundButton("ride", "a", "./sounds/ride.wav", row2, _this.root, _this);
            _this.sounds.push({ key: _this.rideSoundButton.key, sound: _this.rideSoundButton.sound });
            _this.snareSoundButton = new SoundButton("snare", "s", "./sounds/snare.wav", row3, _this.root, _this);
            _this.sounds.push({ key: _this.snareSoundButton.key, sound: _this.snareSoundButton.sound });
            _this.tinkSoundButton = new SoundButton("tink", "d", "./sounds/tink.wav", row3, _this.root, _this);
            _this.sounds.push({ key: _this.tinkSoundButton.key, sound: _this.tinkSoundButton.sound });
            _this.tomSoundButton = new SoundButton("tom", "f", "./sounds/tom.wav", row3, _this.root, _this);
            _this.sounds.push({ key: _this.tomSoundButton.key, sound: _this.tomSoundButton.sound });
        };
        this.createChannels = function () {
            var channels = document.createElement('div');
            channels.classList.add("channels");
            _this.drumkit.appendChild(channels);
            _this.channel1 = new Channel("Channel 1", channels, _this);
            _this.channel2 = new Channel("Channel 2", channels, _this);
            _this.channel3 = new Channel("Channel 3", channels, _this);
            _this.channel4 = new Channel("Channel 4", channels, _this);
        };
        this.saveToRecordingChannels = function (key, time) {
            if (_this.channel1.isRecording === true) {
                if (time - _this.channel1.recordingStartTime <= 10000)
                    _this.channel1.recording.push({ key: key, time: time - _this.channel1.recordingStartTime });
                else
                    _this.channel1.isRecording = false;
            }
            if (_this.channel2.isRecording === true) {
                if (time - _this.channel2.recordingStartTime <= 10000)
                    _this.channel2.recording.push({ key: key, time: time - _this.channel2.recordingStartTime });
                else
                    _this.channel2.isRecording = false;
            }
            if (_this.channel3.isRecording === true) {
                if (time - _this.channel3.recordingStartTime <= 10000)
                    _this.channel3.recording.push({ key: key, time: time - _this.channel3.recordingStartTime });
                else
                    _this.channel3.isRecording = false;
            }
            if (_this.channel4.isRecording === true) {
                if (time - _this.channel4.recordingStartTime <= 10000)
                    _this.channel4.recording.push({ key: key, time: time - _this.channel4.recordingStartTime });
                else
                    _this.channel4.isRecording = false;
            }
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
            _this.saveToRecordingChannels(key, time);
        });
        this.createSoundButtons();
        this.createChannels();
    }
    return App;
}());
var Sound = /** @class */ (function () {
    function Sound(name, key, path, where, button) {
        var _this = this;
        this.playSound = function () {
            (function () {
                _this.button.style.backgroundColor = "#529c5f";
                _this.button.classList.remove("sound-button-transition-effect");
                var timeout = setTimeout(function () { _this.button.style.backgroundColor = "#3c854e"; _this.button.classList.add("sound-button-transition-effect"); clearTimeout(timeout); }, 400);
            })();
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
        this.button = button;
    }
    return Sound;
}());
var SoundButton = /** @class */ (function () {
    function SoundButton(name, key, path, whereButton, whereAudio, context) {
        var _this = this;
        this.key = key;
        this.soundButton = document.createElement('button');
        this.soundButton.textContent = this.key;
        this.soundButton.classList.add("sound-button");
        this.soundButton.addEventListener("click", function (e) {
            var key = _this.key;
            var time = e.timeStamp;
            var sound = _this.sound;
            _this.sound.playSound();
            context.saveToRecordingChannels(key, time);
        });
        whereButton.appendChild(this.soundButton);
        this.sound = new Sound(name, key, path, whereAudio, this.soundButton);
    }
    return SoundButton;
}());
var Channel = /** @class */ (function () {
    function Channel(name, where, context) {
        var _this = this;
        this.recording = [];
        this.isRecording = false;
        this.recordingStartTime = 0;
        this.recordButtonClick = function (e) {
            _this.isRecording = true;
            _this.recording = [];
            _this.recordingStartTime = e.timeStamp;
        };
        this.playChannelClick = function () {
            _this.recording.forEach(function (obj) {
                setTimeout(function () { return _this.context.playChosenSoundByKey(obj.key); }, obj.time);
            });
        };
        this.name = name;
        this.context = context;
        this.channelComponent = document.createElement('div');
        this.channelComponent.className = "channel-component";
        where.appendChild(this.channelComponent);
        this.recordChannelButton = document.createElement('button');
        var iconRecord = document.createElement('i');
        iconRecord.className = "icon-record";
        this.recordChannelButton.className = "record-button channel-button";
        this.recordChannelButton.appendChild(iconRecord);
        this.recordChannelButton.addEventListener('click', function (e) { return _this.recordButtonClick(e); });
        this.channelComponent.appendChild(this.recordChannelButton);
        //play channel button
        this.playChannelButton = document.createElement('button');
        var iconPlay = document.createElement('i');
        iconPlay.className = "icon-play";
        this.playChannelButton.className = "play-button channel-button";
        this.playChannelButton.appendChild(iconPlay);
        this.playChannelButton.addEventListener('click', function () { return _this.playChannelClick(); });
        this.channelComponent.appendChild(this.playChannelButton);
        var tag = document.createElement('span');
        tag.textContent = name;
        tag.className = "channel-label";
        this.channelComponent.appendChild(tag);
    }
    return Channel;
}());
var app = new App();
