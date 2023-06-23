import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/img')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }

})
export const upleader = multer({storage}); 