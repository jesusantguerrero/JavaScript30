class drumBox  {
  constructor() {    
    window.addEventListener('keyup',(e) => {
      this.key = $(`div[data-key="${e.keyCode}"]`)
      this.audio = $(`audio[data-key="${e.keyCode}"]`)
      if (this.audio) 
        this.playSound()
    })
  }
  
  playSound() {
    const {audio, key} = this // accessig using destructor 
    audio.currentTime = 0
    audio.play()
    key.classList.add('playing');

    setTimeout(() => {
      key.classList.remove('playing')
    },200)
  }
  
}

window.$ = (selector) => document.querySelectorAll(selector)[0]; // a shorthand
new drumBox()