var App = /** @class */ (function () {
    function App() {
        this.root = document.getElementById('root');
        debugger;
        this.boomSound = new Sound("boom", "./sounds/boom.wav", this.root);
        this.clapSound = new Sound("clap", "./sounds/clap.wav", this.root);
        this.hihatSound = new Sound("hihat", "./sounds/hihat.wav", this.root);
        this.kickSound = new Sound("kick", "./sounds/kick", this.root);
        this.openhatSound = new Sound("openhat", "./sounds/openhat", this.root);
        this.rideSound = new Sound("ride", "./sounds/ride", this.root);
        this.snareSound = new Sound("snare", "./sounds/snare", this.root);
        this.tinkSound = new Sound("tink", "./sounds/tink", this.root);
        this.tomSound = new Sound("tom", "./sounds/tom", this.root);
    }
    return App;
}());
var Sound = /** @class */ (function () {
    function Sound(name, path, where) {
        this.name = name;
        this.path = path;
        this.sound = document.createElement('audio');
        this.sound.dataset.sound = name;
        where.appendChild(this.sound);
    }
    return Sound;
}());
var app = new App();
