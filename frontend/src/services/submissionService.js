import api from "./api";

export async function submitLocation(formData) {
    try {
        const result = await api.post(`/submissions/submitImage`,formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data
    } catch (err) {
        console.error(err);
        throw err
    }
}