const { User, Literature } = require('../../models');
const pathFile = 'http://localhost:9000/uploads/';

//create data
exports.addLiterature = async (req, res) => {
  try {
    const newLiterature = await Literature.create({
      ...req.body,
      attach: req.files.attach[0].filename,
      userId: req.user.id,
    });

    const dataLiterature = await Literature.findOne({
      where: {
        id: newLiterature.id,
      },
      include: {
        model: User,
        as: 'profile',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    });

    res.send({
      message: 'add new literature is successfull',
      data: { ...dataLiterature, attach: pathFile + dataLiterature.attach },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};
