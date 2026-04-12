import { createSubmission } from "../models/submissions.model.js";

export async function submitImage(req,res) {
    console.log('Submission start')
    if(!req.file) {
       return  res.status(400).json({message:'Image required'});
    }

    const submission = await createSubmission({
        image_url: `/uploads/submissions/${req.file.filename}`,
        x:Number(req.body.x),
        y:Number(req.body.y),
        region:String(req.body.region)
    });

    res.status(201).json({message:'Submission taken', submission});
}

export async function cloudSubmitImage(req, res) {
    try {
        console.log('RECON_DATA_UPLOADING...');
        console.log('>> DATA_RECEIVED:', JSON.stringify(req.body, null, 2));
        console.log('>> FILE_RECEIVED:', req.file ? req.file.path : 'NULL');
        if (!req.file) {
            return res.status(400).json({ message: 'IMAGE_DATA_REQUIRED' });
        }

        const submission = await createSubmission({
            image_url: req.file.path,
            x: Number(req.body.x),
            y: Number(req.body.y),
            region: String(req.body.region)
        });

        res.status(201).json({ 
            message: 'TRANSMISSION_COMPLETE', 
            submission 
        });
    } catch (err) {

        console.error('CRITICAL_ERROR:', err); 

        res.status(500).json({ 
            message: 'SYSTEM_FAILURE', 
            details: err.message 
        });
    }
}