import Listing from '../models/listing.model.js';

export const createListing=async(req,res,next)=>{
    try{
        const listing=await Listing.create(req.body);// create method will create a new instance of Listing model and save it to our db in single step.
        return res.status(201).json(listing);
    }
    catch(error){
        next(error);
    }
}
export const  deleteListing=async(req,res,next)=>{
     const listing=await Listing.findById(req.params.id);
     if(!listing){
        return next(errorHandler(404 , 'Listing not found!'));
     }
     if(req.user.id!==listing.userRef){
        return next(errorHandler(401,'you can only delete your own listings'));
     }
     try{
        await Listing .findByIdAndDelete(req.params.id);
        res.status(200).json('listing deleted Successfully');
     }
     catch(error){
        naxt(error);
     }
};