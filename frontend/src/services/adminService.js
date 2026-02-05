import api from "./api";

export async function getSubmissions() {
    try {
        const res = await api.get('/admin/submissions');
        return res.data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function getAllApproved() {
    try {
        const res = await api.get(`/admin/locations`);
        return res.data;;
    } catch (err) {
        console.error(err);
        throw err
    }
}

export async function approveSubmission(submission_id) {
    try {
        await api.post(`/admin/${submission_id}/approve`);
    } catch (err) {
        console.error(err);
        throw err
    }
}

export async function denySubmission(submission_id) {
    try {
        await api.post(`/admin/${submission_id}/deny`);
    } catch (err) {
        console.error(err);
        throw err
    }
}