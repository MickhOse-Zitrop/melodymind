import {
    useEffect,
    useState
} from "react"

var audio = new Audio();
var click = 0;

audio.volume = '0.7';

export const useAudio = (track) => {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        if (audio.id == track.id) {
            setPlay(true);
            click++
        } else {
            setPlay(false)
            click = 0;
        }
    }, [track])

    function setTimeOnBar(time, pause) {
        audio.currentTime = time * audio.duration / 100;
        if (pause)
            audio.play()
    }

    function handleTime() {
        var trackColorize = Math.floor(audio.currentTime * 88 / audio.duration);
        try {
            for (let i = 0; i < 88; i++) {
                document.getElementById(`item${i}`).style.background = '#9f9f9f';
            }
            for (let i = 0; i < trackColorize; i++) {
                document.getElementById(`item${i}`).style.background = '#fff';
            }
        } catch {}
    }

    function handleTimeBar() {
        var trackBarColorize = Math.floor(audio.currentTime * 100 / audio.duration)

        if (trackBarColorize)
            return trackBarColorize;
        else return 0
    }

    function handlePlay() {
        if (click == 0) {
            // if (audio.id != track.id) {
            audio.src = track.audio;
            audio.id = track.id;
            // }
            click++
        }
        if (play) {
            audio.pause()
            setPlay(false)
        } else {
            audio.play()
            setPlay(true)
        }
    }

    return {
        audio,
        play,
        setPlay,
        handlePlay,
        handleTime,
        handleTimeBar,
        setTimeOnBar
    }
}