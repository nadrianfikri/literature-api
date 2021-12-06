const { User } = require('../../models');
const pathFile = process.env.PATH_FILE || 'http://localhost:9000/uploads/';
const cloudinary = require('../thirdparty/cloudinary');

// req add user
exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      avatar: 'default.jpg',
    });

    const resData = await User.findOne({
      where: {
        id: newUser.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    res.send({
      message: 'Add new user success',
      data: resData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

//read all data
exports.getUsers = async (req, res) => {
  try {
    const dataUsers = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    dataUsers.forEach((user) => (user.avatar = cloudinary.url(user.avatar, { secure: true })));

    res.send({
      message: 'Get data success',
      data: dataUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// read data by id
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    dataUser.avatar = cloudinary.url(dataUser.avatar, { secure: true });
    res.send({
      message: 'Get data success',
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

//   update
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.files) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'literature-files',
        use_filename: true,
        unique_filename: false,
      });
      await User.update(
        {
          ...req.body,
          avatar: result.public_id,
        },
        {
          where: {
            id,
          },
        }
      );
    } else {
      await User.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    const updatedData = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });
    updatedData.avatar = cloudinary.url(updatedData.avatar, { secure: true });

    res.send({
      message: 'update data user is successfull',
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

//   delete
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `delete user with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};
