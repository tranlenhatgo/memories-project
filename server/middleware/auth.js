import jwt from 'jsonwebtoken';

//middleware to check if user is authenticated
//if user want to like a post: click the like button => auth middleware (next) => like controller

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //if token length is less than 500 then it is our custom token else it is google token

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }
        //userId still in the next controller, can used to populate the controller
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;