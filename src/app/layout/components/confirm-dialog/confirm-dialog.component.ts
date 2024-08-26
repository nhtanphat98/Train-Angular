import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [ConfirmDialogModule, ToastModule],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss',
    providers: [ConfirmationService, MessageService],
})
export class ConfirmDialogComponent {

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}
    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target!,
            header: 'Confirmation',
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({
                    key: 'confirmed',
                    severity: 'success',
                    summary: 'Confirmed',
                    detail: 'You have accepted',
                });
            },
            reject: () => {
                this.messageService.add({
                    key: 'rejected',
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                });
            },
        });
    }
}
