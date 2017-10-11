class Clock {
  constructor () {
    this.hands = {
      second: document.querySelector('.second-hand'),
      minute: document.querySelector('.min-hand'),
      hour: document.querySelector('.hour-hand')
    }
    this.time = null
    setInterval( () => this.run(),1000)
  }
  
  run () {
    this.time = new Date()

    for (const handName in this.hands) { 
      this.moveHand(this.hands[handName], handName);
    }
  }

  moveHand (hand, unit) { // handname becomes in unit here
    this.setDegrees(unit)
    this.smoothMove()
    
    hand.style.transform = `rotate(${this.degrees}deg)`
  }
  
  setDegrees (unit) {
    let tick = this.time.getSeconds();
    let slice = 60;
    
    if (unit == 'minute'){
      tick = this.time.getMinutes()
    } else if (unit == 'hour') {
      tick = this.time.getHours()
      slice = 12
    }
    
    this.degrees = (tick / slice * 360) + 90
  }

  smoothMove () {
    const hand = this.hands['second'];

    if (this.degrees === 444) {
      hand.classList.add('no-transition')
    } else if (this.degrees > 90) {
      hand.classList.remove('no-transition')
    }

  }
}

new Clock();