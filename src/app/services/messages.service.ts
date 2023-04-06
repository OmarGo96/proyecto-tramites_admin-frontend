import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    public message: any;
    public status: any;
    public deletePopOup: any;

    printStatus(message: any, status: string, mailed?: boolean) {
        this.message = message;
        this.status = status;

        if (this.status === 'success') {
            Swal.fire({
                html: '' + this.message,
                icon: this.status,
                showConfirmButton: false,
                timer: mailed ? 4000 : 2500,
            });

        } else if (this.status === 'error') {
            Swal.fire({
                html: '' + this.message,
                icon: this.status,
                timer: 5000
            });
        } else if (this.status === 'warning') {
            Swal.fire({
                html: '' + this.message,
                icon: this.status,
                timer: 4000
            });
        }
    }


    printStatusArray(message: [], status: any, mailed?: any) {
        let msg;
        for (let i = 0; i < message.length; i++) {
            msg = message[i] + '<br>';
        }
        this.status = status;

        if (this.status === 'success') {
            Swal.fire({
                html: '' + msg,
                icon: this.status,
                showConfirmButton: false,
                timer: mailed ? 4000 : 2500,
            });

        } else if (this.status === 'error') {
            Swal.fire({
                html: '' + msg,
                icon: this.status,
                timer: 5000
            });
        } else if (this.status === 'warning') {
            Swal.fire({
                html: '' + msg,
                icon: this.status,
                timer: 4000
            });
        }
    }

    errorAlert(messages: any) {
        let msg;
        messages.forEach((m: any) => {
            msg = m.message;
        });

        Swal.fire({
            title: 'Ups, algo salio mal',
            text: msg,
            icon: 'error',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            customClass: {
                confirmButton: 'text-white bg-red-500 rounded-lg px-3 py-2 text-center',
            },
            buttonsStyling: false,
            heightAuto: false
        });
    }

    confirmRequest(msg?: any, confirmBtnText?: any, cancelBtnText?: any) {
        this.deletePopOup = Swal.fire({
            title: msg ? msg : 'Are you sure to proceed ?',
            icon: 'warning',
            showCancelButton: true,
            focusCancel: true,
            confirmButtonText: confirmBtnText ? confirmBtnText : 'Yes',
            cancelButtonText: cancelBtnText ? cancelBtnText : 'Discard',
            confirmButtonColor: '#1d7a18'
        });
        return this.deletePopOup;
    }

    printStatusArrayNew(errors: [], status: any, mailed?: any) {
        let msg;
        errors.forEach((error: any, index) => {
            if (index === 0) {
                msg = error.message;
            }
        });

        this.status = status;

        if (this.status === 'success') {
            Swal.fire({
                html: '' + msg,
                icon: this.status,
                showConfirmButton: false,
                timer: mailed ? 4000 : 2500,
            });

        } else if (this.status === 'error') {
            Swal.fire({
                html: '' + msg,
                icon: this.status
            });
        } else if (this.status === 'warning') {
            Swal.fire({
                html: '' + msg,
                icon: this.status,
                timer: 4000
            });
        }
    }

    confirmRemove() {
        this.deletePopOup = Swal.fire({
            title: 'Are you sure you want to remove this item?',
            text: 'This action cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            focusCancel: true,
            confirmButtonText: 'Remove',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#ce3600'
        });
        return this.deletePopOup;
    }

    dismissRemove() {
        this.deletePopOup = Swal.fire({
            title: 'Canceled',
            text: 'Your information is safe :), action canceled',
            icon: 'info',
            timer: 1000
        });
        return this.deletePopOup;
    }


    dismissAction() {
        this.deletePopOup = Swal.fire({
            title: 'Canceled',
            text: 'Action canceled',
            icon: 'info',
            timer: 1000
        });
        return this.deletePopOup;
    }

    // Función para preguntar al usuario si desea continuar con la eliminación de un elemento
    confirmDelete(message: any) {
        this.deletePopOup = Swal.fire({
            title: message,
            text: 'Esta acción no se puede cancelar',
            icon: 'warning',
            showCancelButton: true,
            focusCancel: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#b20909'
        });
        return this.deletePopOup;
    }

    // Función para mostrar mensaje de cancelación de acción
    dismissDelete() {
        this.deletePopOup = Swal.fire({
            title: 'Action Cancel',
            text: 'No changes applied',
            icon: 'info',
            timer: 1500
        });
        return this.deletePopOup;
    }

    // endregion
    constructor() {
    }
}
