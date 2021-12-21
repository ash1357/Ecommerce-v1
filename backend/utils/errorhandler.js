//Error node ki default class he
class ErrorHandler extends Error{
    constructor(message,statusCode){
        //super is constructor of error class
        super(message);
        this.statusCode=statusCode

        Error.captureStackTrace(this,this.constructor);

    }
}

module.exports=ErrorHandler;