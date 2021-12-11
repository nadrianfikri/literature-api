// const { Op } = require('sequelize/dist');
const { User, Literature } = require('../../models');
const pathFile = process.env.PATH_FILE || 'http://localhost:9000/uploads/';
const cloudinary = require('../thirdparty/cloudinary');

//create data
exports.addLiterature = async (req, res) => {
  try {
    // const thumbnail = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
    //   folder: 'literature-files',
    //   use_filename: true,
    //   unique_filename: false,
    // });

    const newLiterature = await Literature.create({
      ...req.body,
      attach: req.files.attach[0].filename,
      // thumbnail: thumbnail.public_id,
      thumbnail: req.files.thumbnail[0].filename,
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
        exclude: ['createdAt', 'userId'],
      },
      order: [['updatedAt', 'DESC']],
    });

    dataLiterature.forEach((item) => {
      item.attach = pathFile + item.attach;
      item.thumbnail = pathFile + item.thumbnail;
      // item.profile.avatar = pathFile + item.profile.avatar;
      // item.thumbnail = cloudinary.url(item.thumbnail, { secure: true });
      item.profile.avatar = cloudinary.url(item.profile.avatar, { secure: true });
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
    dataLiterature.thumbnail = pathFile + dataLiterature.thumbnail;
    dataLiterature.profile.avatar = pathFile + dataLiterature.profile.avatar;
    // dataLiterature.profile.avatar = cloudinary.url(dataLiterature.profile.avatar, { secure: true });

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
    // dataLiterature.attach = cloudinary.url(dataLiterature.attach, { secure: true });
    // dataLiterature.profile.avatar = cloudinary.url(dataLiterature.profile.avatar, { secure: true });

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
      order: [['updatedAt', 'DESC']],
    });

    dataByUser.forEach((item) => {
      item.attach = pathFile + item.attach;
      item.thumbnail = pathFile + item.thumbnail;
      item.profile.avatar = pathFile + item.profile.avatar;
      // item.thumbnail = cloudinary.url(item.thumbnail, { secure: true });
      // item.profile.avatar = cloudinary.url(item.profile.avatar, { secure: true });
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
      order: [['publication_date', 'DESC']],
    });

    dataLiterature.forEach((item) => {
      item.attach = pathFile + item.attach;
      item.thumbnail = pathFile + item.thumbnail;
      item.profile.avatar = pathFile + item.profile.avatar;
      // item.thumbnail = cloudinary.url(item.thumbnail, { secure: true });
      // item.profile.avatar = cloudinary.url(item.profile.avatar, { secure: true });
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
