module.exports = theFunc => (req,res,next)=>{

    //promise is javascript class
    Promise.resolve(theFunc(req,res,next)).catch(next); 
}