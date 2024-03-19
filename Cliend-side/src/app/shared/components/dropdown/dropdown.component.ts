import { Component, HostListener, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor, OnInit {

  @Input() options: any[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() className: string = '';

  selectedOption: any;
  showOptions: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const element = event.target as HTMLElement;
    if (!element.closest('.custom-dropdown')) {
      this.showOptions = false;
    }
  }


  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: any) {
    this.selectedOption = this.options.find(option => option.value === value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  toggleDropdown() {
    this.showOptions = !this.showOptions;
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.onChange(option.value);
    this.onTouched();
    this.showOptions = false;
  }

}
