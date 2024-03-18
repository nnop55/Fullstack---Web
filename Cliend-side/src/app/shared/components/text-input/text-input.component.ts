import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {

  @Input() placeholder: string = '';
  @Input() inpType: 'submit' | 'text' = 'text';
  @Input() className: string = '';

  private _innerValue: any = '';

  private onChangeCallback: (_: any) => void = () => { };
  private onTouchedCallback: () => void = () => { };

  constructor() { }

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
