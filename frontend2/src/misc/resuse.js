import Axios from "axios";

export const getUser = () => {
    return Axios({
        method: "GET",
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
        url: urlPrefix() + "/auth/user",
    }).then((res) => {
        console.log(res);
        if (res.data) {
            if (res.data.sucess) {
                localStorage.setItem("User", JSON.stringify(res.data));
                window.dispatchEvent(new Event('storage'))
                return res.data;
            }
            else {
                return res.data;
            }
        } else {
            logout();
            return null;
        }
    });
};

export const logout = () => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: urlPrefix() + "auth/logout",
    }).then((res) => {
        localStorage.removeItem("User");
        window.dispatchEvent(new Event('storage'))
        window.location.href = '/login';
    });
}

export const logoutWNRedirect = () => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: urlPrefix() + "auth/logout",
    }).then((res) => {
        localStorage.removeItem("User");
        window.dispatchEvent(new Event('storage'))
    });
}

export const urlPrefix = () => {
    if (window.location.origin.includes("localhost")) {
        return "http://localhost:8080"
    }
    else {
        return "https://hcet-studio.herokuapp.com/";
    }
};

export const checkLoggedIn = () => {
    if (localStorage.getItem("User")) {
        return Axios({
            method: "GET",
            withCredentials: true,
            url: urlPrefix() + "auth/user",
        }).then((res) => {
            if (res.data && res.data.sucess) {
                localStorage.setItem("User", JSON.stringify(res.data));
                window.dispatchEvent(new Event('storage'))
                return true;
            } else {
                logoutWNRedirect();
                return null;
            }
        });
    }
    else {
        return null;
    }
}
