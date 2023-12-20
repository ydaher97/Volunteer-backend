const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const existingUser = await User.findOne({ email: req.body.email });
		if (existingUser)
			return res
				.status(409)
				.send({ message: "User with given email already exists!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashPassword 
		});

		await newUser.save();

		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/:userId', async (req, res) => {
	try {
	  const user = await User.findById(req.params.userId).populate('organization');
	  console.log(user)
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  res.status(200).json(user);
	} catch (error) {
	  console.error('Error fetching user by ID:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  });
   

module.exports = router;
