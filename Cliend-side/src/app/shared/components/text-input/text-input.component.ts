import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {

  @Input() placeholder: string = '';
  @Input() inpType: 'number' | 'text' | 'password' = 'text';
  @Input() className: string = '';
  @Input() showEye: boolean = false;

  eye: 'hiding' | 'showing' = 'hiding'
  private _innerValue: any;

  private onChangeCallback: (_: any) => void = () => { };
  private onTouchedCallback: () => void = () => { };

  constructor() { }

  togglePassEye() {
    if (this.eye == 'hiding') {
      this.eye = 'showing';
      this.inpType = 'text'
    } else {
      this.eye = 'hiding';
      this.inpType = 'password';
    }
  }

  writeValue(value: any): void {
    if (value !== this._innerValue) {
      this._innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void { }

  get innerValue(): any {
    return this._innerValue;
  }

  set innerValue(value: any) {
    if (value !== this._innerValue) {
      this._innerValue = value;
      this.onChangeCallback(this._innerValue);
    }
  }

  onInputChange(event: any): void {
    this.innerValue = event.target.value;
  }

  onBlur(): void {
    this.onTouchedCallback();
  }
}
