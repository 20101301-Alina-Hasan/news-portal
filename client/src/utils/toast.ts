import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast utility function
export const showToast = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
        toast.success(message);
    } else if (type === 'error') {
        toast.error(message);
    }
};