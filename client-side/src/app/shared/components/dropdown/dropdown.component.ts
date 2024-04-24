import { Component, ElementRef, HostListener, Input, SimpleChanges, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ],
})
export class DropdownComponent implements ControlValueAccessor {

  @Input() options: any[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() className: string = '';
  @Input() showLabel: boolean = true;
  @Input() defaultValue: any;

  selectedOption: any;
  showOptions: boolean = false;

  elRef: ElementRef = inject(ElementRef)

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target)) {
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
