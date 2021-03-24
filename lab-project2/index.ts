type SoundObject = {
    key: string,
    sound: Sound
}
type ChannelStampObject = {
    key: string,
    time: any,
}

class App {

root: HTMLDivElement = document.getElementById('root') as HTMLDivElement;
drumkit: HTMLDivElement = document.getElementById('drumkit') as HTMLDivElement;


channel1!: Channel;
channel2!: Channel;
channel3!: Channel;
channel4!: Channel;

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

playAllButton!: PlayAllButton;

constructor(){
this.root.onselectstart = () => {return false;}
document.body.addEventListener('keypress', e => {
    const key = e.key;
    const time = e.timeStamp;
    this.playChosenSound(e);
    this.saveToRecordingChannels(key, time);
});
this.createSoundButtons();
this.createChannels();
}

//create sound buttons
createSoundButtons = () => {

const row1 = document.getElementById('row1') as HTMLDivElement;
const row2 = document.getElementById('row2') as HTMLDivElement;
const row3 = document.getElementById('row3') as HTMLDivElement;

this.boomSoundButton = new SoundButton("boom", "q", "./sounds/boom.wav", row1, this.root, this);
this.sounds.push({key: this.boomSoundButton.key, sound: this.boomSoundButton.sound});

this.clapSoundButton = new SoundButton("clap", "w", "./sounds/clap.wav", row1, this.root, this);
this.sounds.push({key: this.clapSoundButton.key, sound: this.clapSoundButton.sound});

this.hihatSoundButton = new SoundButton("hihat", "e", "./sounds/hihat.wav", row1, this.root, this);
this.sounds.push({key: this.hihatSoundButton.key, sound: this.hihatSoundButton.sound});

this.kickSoundButton = new SoundButton("kick", "r", "./sounds/kick.wav", row2, this.root, this);
this.sounds.push({key: this.kickSoundButton.key, sound: this.kickSoundButton.sound});

this.openhatSoundButton = new SoundButton("openhat", "t", "./sounds/openhat.wav", row2, this.root, this);
this.sounds.push({key: this.openhatSoundButton.key, sound: this.openhatSoundButton.sound});

this.rideSoundButton = new SoundButton("ride", "a", "./sounds/ride.wav", row2, this.root, this);
this.sounds.push({key: this.rideSoundButton.key, sound: this.rideSoundButton.sound});

this.snareSoundButton = new SoundButton("snare", "s", "./sounds/snare.wav", row3, this.root, this);
this.sounds.push({key: this.snareSoundButton.key, sound: this.snareSoundButton.sound});

this.tinkSoundButton = new SoundButton("tink", "d", "./sounds/tink.wav", row3, this.root, this);
this.sounds.push({key: this.tinkSoundButton.key, sound: this.tinkSoundButton.sound});

this.tomSoundButton = new SoundButton("tom", "f", "./sounds/tom.wav", row3, this.root, this);
this.sounds.push({key: this.tomSoundButton.key, sound: this.tomSoundButton.sound});
}

createChannels = () => {

    const channels = document.createElement('div');
    channels.classList.add("channels");
    this.drumkit.appendChild(channels);

    this.channel1 = new Channel("Channel 1", channels, this); 
    this.channel2 = new Channel("Channel 2", channels, this); 
    this.channel3 = new Channel("Channel 3", channels, this); 
    this.channel4 = new Channel("Channel 4", channels, this);
    
    this.playAllButton = new PlayAllButton([this.channel1, this.channel2, this.channel3, this.channel4], this.root);
    }

saveToRecordingChannels = (key: string, time: number) => {
    if(this.channel1.isRecording === true) {
        if(time-this.channel1.recordingStartTime <= 10000)this.channel1.recording.push({key, time: time-this.channel1.recordingStartTime});
        else this.channel1.isRecording = false;
    }
    if(this.channel2.isRecording === true) {
        if(time-this.channel2.recordingStartTime <= 10000)this.channel2.recording.push({key, time: time-this.channel2.recordingStartTime});
        else this.channel2.isRecording = false;
    }
    if(this.channel3.isRecording === true) {
        if(time-this.channel3.recordingStartTime <= 10000)this.channel3.recording.push({key, time: time-this.channel3.recordingStartTime});
        else this.channel3.isRecording = false;
    }
    if(this.channel4.isRecording === true) {
        if(time-this.channel4.recordingStartTime <= 10000)this.channel4.recording.push({key, time: time-this.channel4.recordingStartTime});
        else this.channel4.isRecording = false;
    }
}

playChosenSound = (e: KeyboardEvent) => {

    this.sounds.forEach(sound => {
        if(e.key.toLowerCase() === sound.key)
        {
            sound.sound.playSound();
        }
    });
}
playChosenSoundByKey = (key: string) => {

    this.sounds.forEach(sound => {
        if(key.toLowerCase() === sound.key)
        {
            sound.sound.playSound();
        }
    });
}

}

class Sound {
    name: string;
    key: string;
    path: string;
    sound: HTMLAudioElement;
    button: HTMLButtonElement;

    constructor(name: string, key: string, path: string, where: HTMLDivElement, button: HTMLButtonElement){
        this.name = name;
        this.key = key;
        this.path = path;
        this.sound = document.createElement('audio');
        this.sound.dataset.sound = name;
        this.sound.src = path;
        where.appendChild(this.sound);
        this.button = button;
    }

    playSound = () => {
        (() => {
            this.button.style.backgroundColor = "#529c5f";
            this.button.classList.remove("sound-button-transition-effect");
            const timeout = setTimeout(()=>{this.button.style.backgroundColor = "#3c854e"; this.button.classList.add("sound-button-transition-effect"); clearTimeout(timeout);},400)
        })();
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

        

        this.soundButton = document.createElement('button');
        this.soundButton.textContent = this.key;
        this.soundButton.classList.add("sound-button");
        this.soundButton.addEventListener("click", (e) => {
            const key = this.key;
            const time = e.timeStamp;
            const sound = this.sound
            this.sound.playSound();
            context.saveToRecordingChannels(key, time);
        });
        whereButton.appendChild(this.soundButton);

        this.sound = new Sound(name, key, path, whereAudio, this.soundButton);
    }

}

class Channel {
    name: string;
    recording: ChannelStampObject[] = [];
    isRecording = false;
    recordingStartTime: number = 0;
    channelComponent: HTMLDivElement;
    playChannelButton: HTMLButtonElement;
    recordChannelButton: HTMLButtonElement;
    context: App;


    constructor(name: string, where: HTMLDivElement, context: App){
        this.name = name;
        this.context = context;

        this.channelComponent = document.createElement('div');
        this.channelComponent.className = "channel-component";
        where.appendChild(this.channelComponent);

        this.recordChannelButton = document.createElement('button');
        const iconRecord = document.createElement('i');
        iconRecord.className = "icon-record";
        this.recordChannelButton.className = "record-button channel-button";
        this.recordChannelButton.appendChild(iconRecord);

        this.recordChannelButton.addEventListener('click', (e)=>this.recordButtonClick(e))
        this.channelComponent.appendChild(this.recordChannelButton);
        

        //play channel button
        this.playChannelButton = document.createElement('button');
        const iconPlay = document.createElement('i');
        iconPlay.className = "icon-play";
        this.playChannelButton.className = "play-button channel-button";
        this.playChannelButton.appendChild(iconPlay);
        this.playChannelButton.addEventListener('click', ()=>this.playChannelClick())
        this.channelComponent.appendChild(this.playChannelButton);

        const tag = document.createElement('span');
        tag.textContent = name;
        tag.className = "channel-label";
        this.channelComponent.appendChild(tag);

    }

    recordButtonClick = (e: MouseEvent) => {
            this.isRecording = true;
            this.recording = [];
            this.recordingStartTime = e.timeStamp;
            (() => {
                this.recordChannelButton.style.backgroundColor = "#ff0000";
                this.recordChannelButton.style.color = "#efefef";
                const timeout = setTimeout(()=>{this.recordChannelButton.style.backgroundColor = "#ffd9d9"; this.recordChannelButton.style.color = "#ff0000"; clearTimeout(timeout);},10000)
            })();
    }

    playChannelClick = () => {
        (() => {
            this.playChannelButton.style.backgroundColor = "#005c08";
            this.playChannelButton.style.color = "#efefef";
            const timeout = setTimeout(()=>{this.playChannelButton.style.backgroundColor = "#c4ffc9"; this.playChannelButton.style.color = "#005c08"; clearTimeout(timeout);},10000)
        })();
        this.recording.forEach(obj => {
            setTimeout(() => this.context.playChosenSoundByKey(obj.key), obj.time);
        });
    }

}

    class PlayAllButton{
        button: HTMLButtonElement;
        channels: Channel[] = [];

        constructor(channels: Channel[], where: HTMLDivElement){
            this.button = document.createElement('button');
            this.button.className = "play-all-button";
            this.button.textContent = "play all";
            this.button.addEventListener('click', ()=>{
                (() => {
                    this.button.style.backgroundColor = "#005c08";
                    this.button.style.color = "#efefef";
                    const timeout = setTimeout(()=>{this.button.style.backgroundColor = "#c4ffc9"; this.button.style.color = "#005c08"; clearTimeout(timeout);},10000)
                })();
                channels.forEach(channel => {
                    const clickEvent = new MouseEvent('click');
                    channel.playChannelButton.dispatchEvent(clickEvent);
                });
            });
            where.appendChild(this.button);
        }


    }

const app = new App();