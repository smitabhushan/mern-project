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