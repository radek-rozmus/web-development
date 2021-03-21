var App = /** @class */ (function () {
    function App() {
        this.root = document.getElementById('root');
        this.boomSound = new Sound("boom", "./sounds/boom", this.root);
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
(function () { return new App(); });
