import { getPendingSubmissions,getSubmissionById,updateSubmissionStatus } from "../models/submissions.model.js";
import { createLocationFromSubmission,getAllLocations } from "../models/location.model.js";


export async function listPending(req,res) {
    try {
        const result = await getPendingSubmissions()
        res.status(200).json({pending:result});
    } catch (err) {
        console.error(err);
    }
}

export async function getAllApproved(req,res) {
    try {
        const result = await getAllLocations();
        res.status(200).json({locations:result});
    } catch (err) {
        console.error(err);
    }
}

export async function approveSubmission(req,res) {
    try {
        const sub = await getSubmissionById(req.params.id);
        console.log(sub)
        if(!sub) return res.status(404).json({message:'Couldnt find the submission'});

        await createLocationFromSubmission(sub)
        await updateSubmissionStatus(sub.id,'Approved')
        res.json({message:'Submission accepted', success: true });
    } catch (err) {
        console.error(err)
    }
}

export async function denySubmission(req,res) {
    try {
        const sub = await getSubmissionById(req.params.id)
        if(!sub) return res.status(404).json({message:'Couldnt find the submission'});
        await createLocationFromSubmission(sub)
        await updateSubmissionStatus(sub.id,'Denied')
        res.json({message:'Submission denied'})
    } catch (err) {
        console.error(err)
    }
}

    