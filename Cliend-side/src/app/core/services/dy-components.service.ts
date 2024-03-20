import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { PasswordStepsModalComponent } from 'src/app/shared/components/password-steps-modal/password-steps-modal.component';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class DyComponentsService {

  private passwordStepsModalRef!: ComponentRef<PasswordStepsModalComponent>

  constructor() { }

  showMessage(message: string, vcRef: ViewContainerRef) {
    vcRef.clear()
    const ref = vcRef.createComponent(SnackbarComponent)
    ref.setInput('message', message)

    setTimeout(() => {
      ref.destroy()
    }, 3000);
  }

  openPasswordStepsModal(vcRef: ViewContainerRef) {
    vcRef.clear()
    this.passwordStepsModalRef = vcRef.createComponent(PasswordStepsModalComponent)
    this.passwordStepsModalRef.instance.closeClicked.subscribe(() => this.closePasswordStepsModal());
  }

  closePasswordStepsModal() {
    if (this.passwordStepsModalRef) {
      this.passwordStepsModalRef.destroy();
    }
  }
}
