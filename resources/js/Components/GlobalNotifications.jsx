import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function GlobalNotifications() {
    const { flash = {} } = usePage().props;

    useEffect(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        if (flash.success) {
            Toast.fire({ icon: 'success', title: flash.success });
        }
        if (flash.error) {
            Toast.fire({ icon: 'error', title: flash.error });
        }
        if (flash.warning) {
            Toast.fire({ icon: 'warning', title: flash.warning });
        }
        if (flash.info) {
            Toast.fire({ icon: 'info', title: flash.info });
        }
    }, [flash]);

    return null;
}
