const errorHandler = (err, req, res, next) => {
    console.log("Error:", err.message)

    if(err.status){
        res.status(err.status).json({Error_message: err.message})
    }else{
    res.status(500).json({messages: err.message})
    }

    
}

export default errorHandler