import multer from "multer";

export const upload =multer({
    storage,
    fileFilter,
    limits
});