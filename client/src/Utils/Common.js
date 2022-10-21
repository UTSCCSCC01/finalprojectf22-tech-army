import defaultProfilePic from'../assets/profilepic1.png'
import defaultCoverImg from '../assets/profileBackground.png'

export const getUser =() => {
    const userStr = sessionStorage.getItem("name");

    console.log("test");
    //console.log(JSON.parse(userStr));
    //JSON.parse(userStr);
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getEmail =() => {
    const emailStr = sessionStorage.getItem("email");
    //console.log(JSON.parse(emailStr));
    // JSON.parse(emailStr);

    if (emailStr) return JSON.parse(emailStr);
    else return null;
}

export const getCoverImg = () => {
    const coverImg = sessionStorage.getItem("coverImg");

    if (coverImg) return JSON.parse(coverImg);
    else return defaultCoverImg;
}

export const getProfilePicUrl = () => {
    const profilePicUrl = sessionStorage.getItem("profilePicUrl");

    if (profilePicUrl) return JSON.parse(profilePicUrl);
    else return defaultProfilePic;
}

export const getToken =() => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token) => {
    sessionStorage.setItem("token", token);
}


export const setUserData = (name, email, profilePicUrl, coverImg) => {
    sessionStorage.setItem("name", JSON.stringify(name));
    sessionStorage.setItem("email", JSON.stringify(email));
    sessionStorage.setItem("coverImg", JSON.stringify(coverImg));
    sessionStorage.setItem("profilePicUrl", JSON.stringify(profilePicUrl));
}


export const removeUserSession = () =>{
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("token");
}
