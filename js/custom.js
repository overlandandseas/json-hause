// javascript
'use strict'

class JsonValidationTool {
  constructor() {
    this.textarea = document.getElementById('json-textarea')
    this.button = document.getElementById('validate-button')
    this.validP = document.getElementById('valid-p')
    this.invalidP = document.getElementById('invalid-p')
    this.textareaLines = document.getElementById('textarea-lines')
    this.scrollableContainer = document.getElementById('scrollable-container')
    
    this.button.addEventListener('click', this.validate.bind(this))
    this.textarea.addEventListener('input', this.updateLeftCodeNumber.bind(this))
  }

  validate(evt) {
    this.invalidP.classList.add('dn')
    this.validP.classList.add('dn')
    try {
      const jsonObj = JSON.parse(this.textarea.value)
      this.textarea.value = JSON.stringify(jsonObj, null, 2)
      this.validP.classList.remove('dn')
      this.updateLeftCodeNumber()
    } catch(e) {
      this.populateErrorParagraph(e, this.textarea.value)
    }
  }

  populateErrorParagraph(err, value) {
    let messageStr = ''
    if(err.message === 'Unexpected end of JSON input') {

      this.invalidP.innerHTML = err.message 
    } else {

      const indexOfError = Number(err.message.split(' ').pop())
      if (indexOfError === 0) {

        this.invalidP.innerHTML = err.message 
      } else {
        const lineStart = value.lastIndexOf('\n', indexOfError - 1)
        if(lineStart === -1) {

          messageStr =  `${value.substr(0, 40)}
          <br>${'-'.repeat(indexOfError)}^
          <br>${err.message}`

          this.invalidP.innerHTML = messageStr
        } else {
          
          messageStr =  `${value.substr(lineStart, 40).replace(/\s/g, '&nbsp')}
          <br>${'-'.repeat(indexOfError - lineStart)}^
          <br>${err.message.replace(/\s\s\s/g, ' \'\\s\' ')}`

          this.invalidP.innerHTML = messageStr
        }
      }
    }
    this.invalidP.classList.remove('dn')
  }

  updateLeftCodeNumber() {
    this.textareaLines.innerHTML = this.textarea.value.split('\n').map((_, index) => index + 1).join('<br>')

    this.textareaLines.style.height = '16rem'
    this.textareaLines.style.height = `${this.textarea.scrollHeight - 2}px`
    this.textarea.style.height = '16rem'
    this.textarea.style.height = `${this.textarea.scrollHeight - 2}px`

    this.scrollableContainer.style.height = '16rem'
    if (this.scrollableContainer.scrollHeight > this.scrollableContainer.offsetHeight) {
      debugger
      this.scrollableContainer.style['height'] = 'calc(100vh - 346px)'
      // this.scrollableContainer.style.height = `${this.scrollableContainer.scrollHeight}px`
    }
  }
}

const app = new JsonValidationTool()