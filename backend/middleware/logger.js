const logger = (req,res,next) => {
    console.log("from logger middleware the request path:", req.url);
    next()
}


export default logger