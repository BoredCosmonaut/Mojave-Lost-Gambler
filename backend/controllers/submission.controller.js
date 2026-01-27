import { createSubmission } from "../models/submissions.model";

export async function submitImage(req,res) {
    if(!req.file) {
        res.status(400).json({message:'Image required'});
    }

    const submission = await createSubmission({
        imageUrl: `/uploads/${req.file.filename}`,
        x:Number(req.body.x),
        y:Number(req.body.y)
    });

    res.status(201).json({message:'Submission taken', submission});
}
