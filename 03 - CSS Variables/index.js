class app  {
  constructor () {
    this.controls = document.querySelectorAll('input, select')
    this.themes = {
      dark: {'text-color': '#f1f1f1', 'bg-color': '#272727'},
      light: {'text-color': '#272727', 'bg-color': '#f1f1f1'},
      default: {'text-color': '#FFF', 'bg-color': '#193549'},
    }
    this.listen()
  }

  listen () {
    var self = this// the class
    self.controls.forEach((control, _) => {
      control.addEventListener('change', () => { 
        if (control.name != 'theme'){
          self.setValue(control.name, control.value, control.dataset.suffix)
        } else {
          self.setTheme(control.value)    
        }
      })
    })
  }

  setValue(varName, value, suffix){
    if (!suffix) suffix = '' 
    document.documentElement.style.setProperty(`--${varName}`,`${value}${suffix}`)
  }

  setTheme (themeName) {
    const theme = this.themes[themeName]
    const self = this
     for (var key in theme) {
       if (theme.hasOwnProperty(key)) {
         self.setValue(key,theme[key])
       }
     }
  }
}

new app()