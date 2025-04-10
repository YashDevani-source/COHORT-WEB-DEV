import jwt from "jsonwebtoken"


export const isLoggedIn = async (req, res, next) => {
    // get token from cookie
    // check token exist or not
    // get data from token

    try {
        console.log("cookes data",req.cookies.token);
        let token =  req.cookies?.token

        console.log("Token found", token ? "Yes" : "No");

        if(!token){
            console.log("No Token");
            return res.status(401).json({
                success: false,
                Message: "Authentication failed"
            })

        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded Data", decoded);
        req.user = decoded
        
        next()

       
        
    } catch (error) {
        console.log("Auth Middleware failure");
        return res.status(401).json({
            success: false,
            message: "Internal server error"
        })
    }
};