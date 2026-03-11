import ref, { computed } from 'vue'
import {approveSubmission,denySubmission,getAllApproved,getSubmissions,loginAdmin} from '@/services/adminService'

const loading = ref(false);
const error = ref(null);
const token = ref(localStorage.getItem('mojave_access_key', token));
    

export function useAdmin() {

    const isAuthenticated = computed(() => !!token.value)

    async function loginAdmin() {
        loading.value = true;
        error.value = null;
        try {
            const res = await loginAdmin(email,password);
            if(res && res.data.token) {
                token.value = res.data.token;
                localStorage.setItem('mojave_access_key', token);
                return {message:res.data.message, success:true};
            } else {
                throw new error('Invalid response data');
            }
        } catch (err) {
            error.value = 'UPLINK_ERROR: ACCESS_DENIED';
            return {success:false};
        } finally {
            loading.value = false
        }
    }

    function logout() {
        token.value = null;
        localStorage.removeItem('mojave_access_key')
        //redirect to login view again
    }

    async function fetchSubmissions() {
        loading.value = true;
        error.value = null;
        try {
            const data = await getSubmissions();
            return data;
        } catch (err) {
            error.value('FETCH_ERR: PENDING_DATA_UNAVAILABLE');
        } finally {
            loading.value = false;
        }
    }

    async function fetchApproved() {
        loading.value = true;
        error.value = null;
        try {
            const data = await getAllApproved();
            return data;
        } catch (err) {
            error.value = "FETCH_ERR: APPROVED_DATA_UNAVAILABLE";
            return []
        } finally {
            loading.value = false;
        }
    }

    async function handleApprove(id) {
        loading.value = true;
        try {
            await approveSubmission(id);
            return true;
        } catch (err) {
            error.value = "EXECUTION_ERR: APPROVAL_FAILED";
            return false;
        } finally {
            loading.value = false;
        }
    }

    async function handleDeny(id) {
        loading.value = true;
        try {
            await denySubmission(id);
            return true;
        } catch (err) {
            error.value ="EXECUTION_ERR: DENIAL_FAILED";
            return false
        } finally {
            loading.value = false
        }
    }

    return {
        token,
        loading,
        error,
        isAuthenticated,
        handleLogin,
        logout,
        fetchSubmissions,
        fetchApproved, 
        handleApprove,
        handleDeny
    }

}