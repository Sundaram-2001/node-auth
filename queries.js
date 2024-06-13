const { PrismaClient } = require("@prisma/client");
const z = require("zod");
const prisma = new PrismaClient();

const addUser = async (req, res) => {
    const f=req.body.fName;
    const l=req.body.lName;
    const e=req.body.mail;
    const p=req.body.pwd;
    // Validate email using Zod
    const emailSchema = z.string().email({
        message: "Please enter a valid E-mail address!"
    });

    try {
        emailSchema.parse(e);
        console.log("Successfully validated");
    } catch (error) {
        console.error(error);
        res.status(400).send("Please Enter a valid email!");
    }
    try {
        await prisma.User.create({
            data:{
                firstName:f,
                lastName:l,
                email:emailSchema,
                password:p
            }
        })
        res.status(201).send("User Registered!")
    } catch (error) {
        res.status(500).send("Internal Server Error!")
    }
};

module.exports = {
    addUser
};
