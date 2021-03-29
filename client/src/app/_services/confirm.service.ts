import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './../modals/confirm-dialog/confirm-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    buttonOkText = 'Ok',
    buttonCancelText = 'Cancel'
  ): Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        buttonOkText,
        buttonCancelText
      }
    }

    this.bsModelRef = this.modalService.show(ConfirmDialogComponent, config);
    return this.bsModelRef.onHidden.pipe(
      map(() => this.bsModelRef.content.result)
    );
  }
}
