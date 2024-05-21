import { DestroyRef, Directive, ElementRef, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[validate]',
  standalone: true
})
export class ValidationDirective {

  private embeddedView: any;

  @Input('validate') data!: { form: FormGroup };

  private destroyRef: DestroyRef = inject(DestroyRef)
  private el: ElementRef = inject(ElementRef)
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef)
  private templateRef: TemplateRef<any> = inject(TemplateRef<any>)

  ngAfterViewInit() {
    setTimeout(() => {
      this.validate()
    })
  }

  validate() {
    const { form } = this.data;

    form.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.check(form)
      })

    if (!this.embeddedView) {
      this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef)
    }

    this.handleOnSubmit()

  }

  check(form: FormGroup, isSubmit: boolean = false) {
    if (this.embeddedView) {
      Object.keys(form.controls).forEach(control => {
        this.embeddedView.context['$implicit'] = {
          ...this.embeddedView.context['$implicit'],
          [control]: form.controls[control]?.status == 'INVALID' ? true : false
        }

        if (isSubmit) form.controls[control]?.markAsDirty()
      })
    }
  }

  handleOnSubmit() {
    const targetEl = this.el.nativeElement.previousElementSibling;

    if (targetEl) {
      targetEl.addEventListener('submit', (event: Event) => {
        this.check(this.data.form, true)
      });
    }
  }
}

