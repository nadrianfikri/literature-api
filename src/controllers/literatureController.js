const { Op } = require('sequelize/dist');
const { User, Literature } = require('../../models');
const pathFile = 'http://localhost:9000/uploads/';

//create data
exports.addLiterature = async (req, res) => {
  try {
    const newLiterature = await Literature.create({
      ...req.body,
      attach: req.files.attach[0].filename,
      userId: req.user.id,
      status: 'Waiting Approve',
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
      data: dataLiterature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// read all data
exports.getLiteratures = async (req, res) => {
  try {
    const dataLiterature = await Literature.findAll({
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

    dataLiterature.forEach((item) => {
      item.attach = pathFile + item.attach;
      item.profile.avatar = pathFile + item.profile.avatar;
      return item;
    });

    res.send({
      status: 'Success',
      message: 'Get resources successfully',
      data: dataLiterature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// read one data by id
exports.getLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    const dataLiterature = await Literature.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: 'profile',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },

      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    dataLiterature.attach = pathFile + dataLiterature.attach;
    dataLiterature.profile.avatar = pathFile + dataLiterature.profile.avatar;

    res.send({
      message: 'Get resources successfully',
      data: dataLiterature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// update data
exports.updateLiterature = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.files) {
      await Literature.update(
        {
          ...req.body,
          attach: req.files.attach[0].filename,
        },
        {
          where: {
            id,
          },
        }
      );
    } else {
      await Literature.update(
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

    const dataLiterature = await Literature.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: 'profile',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },

      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password', 'userId'],
      },
    });

    dataLiterature.attach = pathFile + dataLiterature.attach;
    dataLiterature.profile.avatar = pathFile + dataLiterature.profile.avatar;

    res.send({
      message: 'Get resources successfully',
      data: dataLiterature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// delete data
exports.deleteLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    await Literature.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `delete Literature with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// get data by specific user who owned literature
exports.getLiteratureByuser = async (req, res) => {
  try {
    const { profile_id } = req.params;

    const dataByUser = await Literature.findAll({
      where: {
        userId: profile_id,
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

    dataByUser.forEach((item) => {
      item.attach = pathFile + item.attach;
      item.profile.avatar = pathFile + item.profile.avatar;
      return item;
    });

    res.send({
      status: 'Success',
      message: 'Get resources successfully',
      data: dataByUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// get data literature with approve status
exports.getLiteraturesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const dataLiterature = await Literature.findAll({
      where: {
        status,
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

    dataLiterature.forEach((item) => {
      item.attach = pathFile + item.attach;
      item.profile.avatar = pathFile + item.profile.avatar;
      return item;
    });

    res.send({
      status: 'Success',
      message: 'Get resources successfully',
      data: dataLiterature,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// catatan
// query like
//  name :{
//   [Op.like]: '%bob%'
// }
