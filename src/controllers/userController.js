const { User } = require('../../models');
const pathFile = 'http://localhost:9000/uploads/';

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

    dataUsers.forEach((user) => (user.avatar = pathFile + user.avatar));

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

    dataUser.avatar = pathFile + dataUser.avatar;
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
      await User.update(
        {
          ...req.body,
          avatar: req.files.avatar[0].filename,
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
    updatedData.avatar = pathFile + updatedData.avatar;

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
