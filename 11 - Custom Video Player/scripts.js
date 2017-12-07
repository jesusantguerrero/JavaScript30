class videoPlayer {
  constructor() {
    this.play = false
    this.timer = null
    this.video = document.querySelector('video'),
    this.controls = {
        progress: document.querySelector('.progress'),
        toggle: document.querySelector('.toggle'),
        volume: document.querySelector('[name=volume]'),
        playbackRate: document.querySelector('[name=playbackRate]'),
        back: document.querySelector('.back'),
        ahead: document.querySelector('.ahead'),
      }
    
    const duration = this.video.duration

    this.listeners()
  }

  togglePlay() {
    if (this.play) {
      this.video.pause()
      clearInterval(this.timer)
    } else {
      this.checkTime()
      this.video.play()
    }
    this.play = !this.play
  }

  checkTime() {
    const p = this.controls.progress.querySelector('.progress__filled')
    const v = this.video
    
    this.timer = setInterval(() => {
      const width = v.currentTime / v.duration * 100
      p.style.flexBasis = `${width}%`
    },1000)
  }


  listeners() {
    const c = this.controls

    c.toggle.addEventListener('click',() => this.togglePlay())
    this.video.addEventListener('click', () => this.togglePlay())
  }

}

const player = new videoPlayer()