import { SignJWT, jwtVerify } from "jose";
const SECRET_key = "ancanks";


export async function signToken(payload){
        return await new SignJWT(payload)
                .setProtectedHeader({alg: 'HS256'})
                .setExpirationTime('1h')
                .sign(new TextEncoder().encode(SECRET_key))
}

export async function verifyToken(token){
    try{
        const {payload} = await jwtVerify(token, SECRET_key);
        return payload;
    }
    catch(err){
        console.log(err);
    }   
}

