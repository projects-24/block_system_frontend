// imports 
import  Axios  from "axios"


// variables 
let end_point 


// endpoint
// end_point = "http://127.0.0.1:8000"
end_point = "https://atbil-blk-backend.onrender.com"
export let EndPoint = end_point  



// saving token  and user info
export const SaveToken = (user , token) => {
    return new Promise((resolve, reject) => {
        sessionStorage.setItem("tk" , JSON.stringify(token))
        sessionStorage.setItem("me" , JSON.stringify(user))
        resolve()
    })
}


// get token and user data
export const GetToken = () => {
    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem("tk")){
            const tk = JSON.parse(sessionStorage.getItem("tk"))
            const user = JSON.parse(sessionStorage.getItem("me"))
            resolve(
                {
                    user: user ,
                    token: tk 
                }
            )
        }else{
            window.location.assign("/")
        }
    })
}


// Sign Out 
export const SignOut = () => {
    new Promise((resolve, reject) => {
        GetToken()
        .then(() => {
            sessionStorage.removeItem("tk")
            sessionStorage.removeItem("user")
            resolve()
        })
    })
    .then(() => window.location.assign("/"))
}



// login 
export const LoginAccount = (email , password) => {
    return new Promise((resolve, reject) => {
        Axios.post( 
            end_point + "/staff/login" ,
            { email , password}
        )
        .then( res => {
            if(res.data.status == "ok"){
                SaveToken(res.data.data , "gdggd553$$6738838303jjdd")
                .then(() => {
                  resolve()
                })
            }else{
                reject(res.data)
            }
        } )
        .catch( err => reject({"message" : JSON.stringify(err.message)}) )
    })
}

// register 
export const RegisterAccount = (doc) => {
    return new Promise((resolve, reject) => {
        Axios.post( 
            end_point + "/staff/register" ,
            doc
        )
        .then( res => {
            if(res.status == "ok"){
                resolve(res)
            }else{
                reject(res)
            }
        } )
        .catch( err => reject(err) )
    })
}


export const GetRequest = (route) => {

    return new Promise((resolve, reject) => {
        Axios.get(end_point + route)
        .then((res) => {
            if(res.data.status == "ok"){
                resolve(res.data)
            }else{
                reject(res.data)
            }
        })
    })
    .catch( err => reject(err) )

}