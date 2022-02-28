exports.getCurrentUser=async(req, res)=>{
    const data=req.user;
    console.log("user",req.isAuthenticated(),req._passport.session?req._passport.session.user:"Maa",req.session);
    res.status(200).json(data);
}