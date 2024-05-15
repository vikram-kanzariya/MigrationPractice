const { Sequelize , Model , DataTypes } = require('sequelize');
const db = require('../models/index');
const { raw } = require('mysql2');

const User = db.user;
const Contact = db.contact;
const Team = db.team;
const Player = db.player;

exports.createUser = async(req , res) => {
  const postData = req.body;

  const user = await User.create(postData);
  // console.log(user);

  return res.json({ success:true , data:user })
}

// Read Data
exports.getUsers = async(req , res) => {
  let users = await User.findAll({
    attributes:['id' , 'firstName' , 'lastName'] , raw:true ,
  });

  res.json({ data:users })
}

exports.getUser = async(req , res) => {
  let users = await User.findOne({
    where:{ id: req.params.id }
  });
  res.json({ data:users })
}

exports.updateUser = async(req , res) => {
  const updatedData = await User.update(
    {
      lastName:"Kohli",
    },
    {
      where:{ firstName:"Virat" }
    }
  );

  return res.json({ success:true , data:updatedData })
}


exports.deleteUser = async(req , res) => {
  const deleteData = await User.destroy({
    where:{ id:1 }
  });
  return res.json({ success:true , message:"Deleted SuccessFully" });
}

exports.CreateOneToOne = async(req , res) => {
  const postdata = req.body;
  const users = await User.create(postdata , {raw:true} );

  if(users && users.id){
    await Contact.create({
      permenant_add:"Charadva",
      curr_add:"Morbi",
      userId:users.id,
    })
  }

  return res.status(200).json({ success:true , message:"One-to-One Relationship Created"});

};

exports.getOnetoOne = async(req , res) => {
  const userData = await Contact.findAll({
    where:{ id:[5 , 6] },
    include:User,
  });

  return res.json({ data:userData })
};

exports.createOneToMany = async(req , res) => {
  // const teamData = await Team.create({
  //   teamName:"Mumbai Indians",
  // });

  // if(teamData && teamData.id){
  //   await Player.create({
  //     playerName:'Rohit',
  //     teamId:teamData.id
  //   });
  // }
  await Player.create(
      { 
        playerName:"TimDavid",
        teamId:2,
      },
  );

  return res.json({ success:true , message:"One to Many Successfull" })
}

exports.getOneToMany = async(req , res) => {
  const data = await Player.findAll({
    // where:{ id:2 },
    attributes:['id' ,'playerName'],
    include:[{
      model:Team , 
      attributes:[ 'teamName' ]
    }],
    
  });

  return res.json({ data:data });
}