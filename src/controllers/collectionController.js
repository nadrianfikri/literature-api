const { User, Literature, Collection } = require('../../models');
const pathFile = 'http://localhost:9000/uploads/';

//create data
exports.addCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const newCollection = await Collection.create({
      ...req.body,
      userId: req.user.id,
      literatureId: id,
      bookmark: 'Yes',
    });

    const dataCollection = await Collection.findOne({
      where: {
        id: newCollection.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Literature,
          as: 'literature',
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
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'literatureId'],
      },
    });

    dataCollection.user.avatar = pathFile + dataCollection.user.avatar;
    dataCollection.literature.attach = pathFile + dataCollection.literature.attach;
    dataCollection.literature.thumbnail = pathFile + dataCollection.literature.thumbnail;
    dataCollection.literature.profile.avatar = pathFile + dataCollection.literature.profile.avatar;

    res.send({
      message: 'add new Collection is successfull',
      data: dataCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// read a collection
exports.getCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const dataCollection = await Collection.findOne({
      where: {
        literatureId: id,
        userId: req.user.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Literature,
          as: 'literature',
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
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'literatureId'],
      },
    });

    dataCollection.user.avatar = pathFile + dataCollection.user.avatar;
    dataCollection.literature.attach = pathFile + dataCollection.literature.attach;
    dataCollection.literature.thumbnail = pathFile + dataCollection.literature.thumbnail;
    dataCollection.literature.profile.avatar = pathFile + dataCollection.literature.profile.avatar;

    res.send({
      message: 'Get resource is successfull',
      data: dataCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// read all collection by user id
exports.getCollections = async (req, res) => {
  try {
    const { profile_id } = req.params;
    const dataCollection = await Collection.findAll({
      where: {
        userId: profile_id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: Literature,
          as: 'literature',
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
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId', 'literatureId'],
      },
    });

    dataCollection.forEach((item) => {
      item.user.avatar = pathFile + item.user.avatar;
      item.literature.thumbnail = pathFile + item.literature.thumbnail;
      item.literature.attach = pathFile + item.literature.attach;
      item.literature.profile.avatar = pathFile + item.literature.profile.avatar;
      return item;
    });

    res.send({
      status: 'Success',
      message: 'Get resources successfully',
      data: dataCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

// delete a collection
exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await Collection.destroy({
      where: {
        id,
      },
    });
    res.send({
      message: `delete collection with id: ${id} success`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};
