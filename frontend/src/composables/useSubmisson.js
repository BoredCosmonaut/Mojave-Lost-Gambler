import { ref } from "vue";
import { submitLocation } from "@/services/submissionService";

export function useSubmission() {
    const submitting = ref(false);
    const success = ref(false);
    const error = ref(null);
    

    async function submit(submissionData) {
        submitting.value = true;
        error.value = null;

        try {
            if(submissionData.image && submissionData.image.size >15 * 1024 * 1024) {
                throw new Error('Image size cant be bigger than 15 mb');
            }

            const formData = new FormData();
            formData.append('image',submissionData.image);
            formData.append('x',submissionData.x);
            formData.append('y',submissionData.y);
            formData.append('region',submissionData.region);

            const res = await submitLocation(formData);
            success.value = true;
            return res;
        } catch (err) {
            console.error(err);
            throw err
        } finally {
            submitting.value = false;
        }
    }

    return {submit,submitting,success,error}
}