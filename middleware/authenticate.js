const adminAuth = (res, req, next) => {
    if (user){
        if (user.isAdmin){
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/auth/login')
    }
}

module.exports = adminAuth