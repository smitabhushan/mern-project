// ye function manual error throw krne ke liye h , agr hum kuch cheeze khud se set krna chahte 
// hai jaise password long hona chahiye agar short password client daalta hai toh
// error throw karo aise maual error ko handle krne 
// ke liye ye function banaya gya hai , statuscode aur message hum manually set kr rhe khudese

export const errorHandler=(statusCode,message)=>{
    const error=new Error();// creating a new error object
    error.statsuCode=statusCode;
    error.message=message;// setting error message property
    return error;
}