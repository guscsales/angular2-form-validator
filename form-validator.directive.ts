import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[FormValidator]'
})
export class FormValidatorDirective extends OnInit {

  @Input('formModel') private model: any;
  @Output() private formSubmit: EventEmitter<any> = new EventEmitter();

  private validateActive: boolean = false;
  private form: any;

  private validatorsAttrs: string[] = ['required', 'number'];

  private elementStatus: ElementStatus = {
    invalid: 'fv-invalid',
    valid: 'fv-valid'
  };

  constructor(
    private e: ElementRef
  ) { super(); }

  ngOnInit() {
    this.form = this.e.nativeElement;
  }

  private createEvents() {
    let self = this;
    //  All Elements
    for (let i = 0; i < this.form.length; i++) {
      let e = this.form[i];
      let type = e.getAttribute('type');
      let event = null;

      if (!type && e.tagName.toLowerCase() == 'textarea')
        type = 'textarea';

      switch (type) {
        case 'text':
        case 'number':
        case 'email':
        case 'phone':
        case 'url':
        case 'textarea':
          event = 'keyup';

          break;
        case 'select':
          event = 'change';
      }

      if (event) {
        e.addEventListener(event, function () {
          self.validate(e);
        }, false);
      }
    }
  }

  private checkElements() {
    //  All Elements
    for (let i = 0; i < this.form.length; i++) {
      let e = this.form[i];

      //  All attributes for each element
      this.validate(e);
    }
  }

  private validate(e: any) {
    for (let j = 0; j < e.attributes.length; j++) {
      let attr = e.attributes[j].nodeName;

      if (this.validatorsAttrs.indexOf(attr) != -1) {
        if (this.isValid(attr, e))
          this.setValid(e)
        else{
          this.setInvalid(e);

          break;
        }
      }

    }
  }

  private isValid(validator: string, e: any) {
    switch (validator) {
      case 'required':
        return this.required(e);
      case 'number':
        return this.number(e);
    }
  }

  private required(e: any) {
    return e.value !== '' && e.value !== undefined && e.value !== null;
  }

  private number(e: any) {
    return /^\d+$/.test(e.value);
  }

  private removeStatus(e: any) {
    e.className = e.className
      .replace(' ' + this.elementStatus.invalid, '')
      .replace(' ' + this.elementStatus.valid, '');
  }

  private setValid(e: any) {
    this.removeStatus(e);

    if (e.className.indexOf(this.elementStatus.valid) == -1)
      e.className += ' ' + this.elementStatus.valid;
  }

  private setInvalid(e: any) {
    this.removeStatus(e);

    if (e.className.indexOf(this.elementStatus.invalid) == -1)
      e.className += ' ' + this.elementStatus.invalid;
  }

  private isFormValid(){
    let isValid = true;

    for (let i = 0; i < this.form.length; i++) {
      let e = this.form[i];

      if(e.className.indexOf(this.elementStatus.invalid) != -1)
        isValid = false;
    }

    return isValid;
  }

  @HostListener('submit') onsubmit() {
    this.validateActive = true;

    this.createEvents();
    this.checkElements();    

    if (this.isFormValid())
      this.formSubmit.emit()
  }

}

export class ElementStatus {
  invalid: string;
  valid: string;
}