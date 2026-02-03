import { createSubmission } from "../models/submissions.model.js";

export async function submitImage(req,res) {
    console.log('Submission start')
    if(!req.file) {
        res.status(400).json({message:'Image required'});
    }

    const submission = await createSubmission({
        image_url: `/uploads/submissions/${req.file.filename}`,
        x:Number(req.body.x),
        y:Number(req.body.y),
        region:String(req.body.region)
    });

    res.status(201).json({message:'Submission taken', submission});
}
