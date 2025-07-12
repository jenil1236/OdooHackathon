module.exports.setAdmin = (req, res, next) => {
    const { key } = req.query;
    const adminKeys = process.env.ADMIN_KEYS?.split(",") || [];
    if(adminKeys.includes(key))
    {
        req.session.isAdmin = true;
        return next();
    } else {
        res.status(403).json({ isAdmin: false });
    }
}

module.exports.isAdmin = (req, res, next) => {
    if(req.session.isAdmin) {
        return next();
    } else {
        res.status(403).json({ isAdmin: false });
    }
}
