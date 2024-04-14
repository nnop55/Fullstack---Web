import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective {
  private loadingComponentRef!: ComponentRef<LoadingComponent>;

  constructor(
    private vcRef: ViewContainerRef
  ) { }

  @Input() spinnerSize: number = 1;
  @Input() set appLoading(condition: boolean) {
    if (condition) {
      this.showLoadingComponent();
    } else {
      this.hideLoadingComponent();
    }
  }

  private showLoadingComponent() {
    this.loadingComponentRef = this.vcRef.createComponent(LoadingComponent);
    this.loadingComponentRef.setInput('size', this.spinnerSize)
  }

  private hideLoadingComponent() {
    if (this.loadingComponentRef) {
      this.loadingComponentRef.destroy();
    }
  }

}
