class App {

root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;

boomSound: Sound;
clapSound: Sound;
hihatSound: Sound;
kickSound: Sound;
openhatSound: Sound;
rideSound: Sound;
snareSound: Sound;
tinkSound: Sound;
tomSound: Sound;

constructor(){
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



}

class Sound {
    name: string;
    path: string;
    sound: HTMLAudioElement;

    constructor(name: string, path: string, where: HTMLDivElement){
        this.name = name;
        this.path = path;
        this.sound = document.createElement('audio');
        this.sound.dataset.sound = name;
        where.appendChild(this.sound);
    }

}

const app = new App();