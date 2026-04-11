import { getPendingSubmissions,getSubmissionById,updateSubmissionStatus } from "../models/submissions.model.js";
import {getAdminByEmail} from '../models/admin.model.js'
import { createLocationFromSubmission,getAllLocations,dbDeleteLocation } from "../models/location.model.js";
import {generateToken} from '../utils/generateToken.js';
import bcrypt from 'bcrypt'


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
        console.log(sub)
        if(!sub) return res.status(404).json({message:'Couldnt find the submission'});
        await updateSubmissionStatus(sub.id,'Denied')
        res.json({message:'Submission denied'})
    } catch (err) {
        console.error(err)
    }
}

export async function deleteLocation(req, res) {
    try {
        const id = req.params.id;

        const success = await dbDeleteLocation(id);
        if (!success) {
            return res.status(404).json({ message: 'Could not find the location' });
        }

        return res.json({ message: 'Location deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function loginAdmin(req,res) {
    const {email,password} = req.body;
    try {
        const user = await getAdminByEmail(email);
        console.log(user)
        if(!user) return res.status(400).json({message:'Email or password wrong'});
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message:'Password wrong'});
        console.log("User role from DB:", user.role,user.id,user.email);
        const token = generateToken({id:user.id,email:user.email,role:user.role});
        res.json({
            message:'Login succesful',
            token:token
        })
    } catch (err) {
        console.error('Error while admin login:',err);
        res.status(500).json({message:'Login unsuccesful due to server'});
    }
}

    