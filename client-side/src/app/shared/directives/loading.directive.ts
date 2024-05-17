import { ComponentRef, Directive, Input, ViewContainerRef } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';
import { SkeletonLoadingComponent } from '../components/skeleton-loading/skeleton-loading.component';

@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective {
  private loadingComponentRef!: ComponentRef<LoadingComponent>;
  private skeletonLoadingComponentRef!: ComponentRef<SkeletonLoadingComponent>;

  constructor(
    private vcRef: ViewContainerRef
  ) { }

  @Input() spinnerSize: number = 1;
  @Input() isBlur: boolean = true;
  @Input() skeleton: boolean = false;
  @Input() rowCount: number = 5;
  @Input() set appLoading(condition: boolean) {
    if (condition) {
      this.showLoadingComponent();
    } else {
      this.hideLoadingComponent();
    }
  }

  private showLoadingComponent() {
    switch (this.skeleton) {
      case true:
        this.skeletonLoadingComponentRef = this.vcRef.createComponent(SkeletonLoadingComponent);
        this.skeletonLoadingComponentRef.setInput('rowCount', this.rowCount)
        break;
      case false:
        this.loadingComponentRef = this.vcRef.createComponent(LoadingComponent);
        this.loadingComponentRef.setInput('size', this.spinnerSize)
        this.loadingComponentRef.setInput('isBlur', this.isBlur)
        break;
    }
  }

  private hideLoadingComponent() {
    switch (this.skeleton) {
      case true:
        this.skeletonLoadingComponentRef &&
          this.skeletonLoadingComponentRef.destroy();
        break;
      case false:
        this.loadingComponentRef &&
          this.loadingComponentRef.destroy();
        break;
    }
  }
}
