class paintApp {

  constructor(elementId) {
    this.el = document.querySelector(elementId)
    this.ctx = this.el.getContext('2d')
    this.coords = {
      x: 0,
      y: 0
    }
    this.hue = 0;
    this.active = false
    this.styles = {
      strokeStyle: `hsl(${this.hue}, 100%, 50%)`,
      lineJoin: 'round',
      lineCap: 'round',
      lineWidth: 50,
    }

    this.config = {
      mode: 'rainbow' // rainbow | custome 
    }

    this.init()

  }

  init() {
    [this.el.width, this.el.height] = [window.innerWidth, window.innerHeight]
    this.setStyles(this.styles)
    this.listen('mousedown', (e) => this.setOrigin(e))
    this.listen('mousemove', (e) => (this.active) ? this.draw(e) : null)
    this.listen('mouseout', (e) => this.active = false)
    this.listen('mouseup', (e) => this.active = false)
    this.listenConfigChanges()
  }

  listen(eventName, callback) {
    this.el.addEventListener(eventName, callback)
  }

  draw(e) {
    const ctx = this.ctx
    const {
      x,
      y
    } = this.coords
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    this.setOrigin(e)
    if (this.config.mode == 'rainbow') this.rainBow()
    
  }

  setStyles(ctxAttributes) {
    const keys = Object.keys(ctxAttributes)
    keys.forEach((key) => {
      this.ctx[key] = ctxAttributes[key]
    });
  }

  setOrigin(e) {
    this.active = true
    this.coords = {
      x: e.offsetX,
      y: e.offsetY
    }
  }

  rainBow() {
    this.hue++
      this.setStyles({
        strokeStyle: `hsl(${this.hue}, 100%, 50%)`
      })
  }

  clear() {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height)
  }

  listenConfigChanges() {
    const self = this
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((element) => {
      element.addEventListener('change', (e) => this.changeConfig(e))
    }, self)
  }

  changeConfig(e) {
    const data = e.target.dataset
    this[data.property][data.key] = e.target.value
    this.setStyles(this.styles)
  }

}

const app = new paintApp('#draw')