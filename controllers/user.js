const { User } = require("../db/models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail } = require("../middlewares/sendMail")

exports.profile = promise(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        balance: user.balance,
        address: user.address + ", " + user.state
    })
})

exports.register = promise(async (req, res) => {
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) throw new Exceptions.EmailExist

    const hash = bcrypt.hashSync(req.body.password, 10)
    const newUser = new User({
        ...req.body,
        password: hash
    })

    const saveUser = await newUser.save()
    res.status(200).json({
        message: "Successfully register a new user",
        user: newUser
    })
})

exports.login = promise(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new Exceptions.CredentialsNotMatched

    const matchedPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!matchedPassword) throw new Exceptions.CredentialsNotMatched

    const token = await jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
        token: token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
})

exports.transferPayment = promise(async (req, res) => {
    const body = req.body

    const admin = await User.findOne({isAdmin: true})
    if(!admin) throw new Exceptions.NotFound("Admin not found")

    const user = await User.findById(req.user._id)
    if (!user) throw new Exceptions.NotFound("User not found")

    const balance = parseInt(user.balance)

    const address = `Dear admin ${admin.name}! I ${user.name}, request you to transfer my payment of total $${balance} to my account number ${body.accountNumber} having account holder name ${body.accountHolderName}. Thanks!`

    await sendMail(admin.email, address)

    res.status(200).json({message: "Email sent successfully. Admin will get back you soon. Please wait."})
})