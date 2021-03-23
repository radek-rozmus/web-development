type SoundObject = {
    key: string,
    sound: Sound
}

class App {

root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
drumkit: HTMLDivElement = document.getElementById('drumkit') as HTMLDivElement;

boomSoundButton!: SoundButton;
clapSoundButton!: SoundButton;
hihatSoundButton!: SoundButton;
kickSoundButton!: SoundButton;
openhatSoundButton!: SoundButton;
rideSoundButton!: SoundButton;
snareSoundButton!: SoundButton;
tinkSoundButton!: SoundButton;
tomSoundButton!: SoundButton;

sounds: SoundObject[] = [];

constructor(){

this.createSoundButtons();

}

//create sound buttons
createSoundButtons = () => {

this.boomSoundButton = new SoundButton("boom", "q", "./sounds/boom.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.boomSoundButton.key, sound: this.boomSoundButton.sound});

this.clapSoundButton = new SoundButton("clap", "w", "./sounds/clap.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.clapSoundButton.key, sound: this.clapSoundButton.sound});

this.hihatSoundButton = new SoundButton("hihat", "e", "./sounds/hihat.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.hihatSoundButton.key, sound: this.hihatSoundButton.sound});

this.kickSoundButton = new SoundButton("kick", "r", "./sounds/kick.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.kickSoundButton.key, sound: this.kickSoundButton.sound});

this.openhatSoundButton = new SoundButton("openhat", "t", "./sounds/openhat.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.openhatSoundButton.key, sound: this.openhatSoundButton.sound});

this.rideSoundButton = new SoundButton("ride", "a", "./sounds/ride.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.rideSoundButton.key, sound: this.rideSoundButton.sound});

this.snareSoundButton = new SoundButton("snare", "s", "./sounds/snare.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.snareSoundButton.key, sound: this.snareSoundButton.sound});

this.tinkSoundButton = new SoundButton("tink", "d", "./sounds/tink.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.tinkSoundButton.key, sound: this.tinkSoundButton.sound});

this.tomSoundButton = new SoundButton("tom", "f", "./sounds/tom.wav", this.drumkit, this.root, this);
this.sounds.push({key: this.tomSoundButton.key, sound: this.tomSoundButton.sound});

}

}

class Sound {
    name: string;
    key: string;
    path: string;
    sound: HTMLAudioElement;

    constructor(name: string, key: string, path: string, where: HTMLDivElement){
        this.name = name;
        this.key = key;
        this.path = path;
        this.sound = document.createElement('audio');
        this.sound.dataset.sound = name;
        this.sound.src = path;
        where.appendChild(this.sound);
    }

    playSound = () => {
        this.sound.currentTime = 0;
        this.sound.play()
    }

}

class SoundButton {
    key: string;
    soundButton: HTMLButtonElement;
    sound: Sound;

    constructor(name: string, key: string, path:string, whereButton: HTMLDivElement, whereAudio: HTMLDivElement, context: App){
        this.key = key;

        this.sound = new Sound(name, key, path, whereAudio);

        this.soundButton = document.createElement('button');
        this.soundButton.textContent = this.key;
        this.soundButton.addEventListener("click", () => this.sound.playSound());
        whereButton.appendChild(this.soundButton);
    }

}

const app = new App();