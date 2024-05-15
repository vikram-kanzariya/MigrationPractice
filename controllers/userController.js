const { where, QueryTypes, Model } = require("sequelize");
const db = require("../models/index");
const user = require("../models/user");

const User = db.user;
const Contact = db.contact;
const Team = db.team;
const Player = db.player;
const Actor = db.actor;
const Profile = db.profile;

// Read Data
const getUsers = async(req , res) => {
  let users = await User.findAll({
    attributes:['id' , 'firstName' , 'lastName']
  });

  res.json({ data:users })
}

const getUser = async(req , res) => {
  let users = await User.findOne({
    where:{ id: req.params.id }
  });
  res.json({ data:users })
}



const createUser = async(req , res) => {
  const postdata = req.body;
  const users = await User.create(postdata);

  console.log("FullName is: " + users.fullName)
  
  return res.status(200).json({
    success:true,
    message:"User Created...",
    data:users, 
  });
}

const oneTooneUser = async(req , res) => {
  const postdata = req.body;
  const users = await User.create(postdata);

  if(users && users.id){
        
    await Contact.create({
      permanent_address:"Halvad",
      current_address:"Chankyapuri",
      UserId:users.id,
    })
  }
  console.log("FullName is: " + users.fullName)
  
  return res.status(200).json({
    success:true,
    message:"User Created...",
    data:users, 
  });



  // const users = await User.create(
  //   {
  //   firstName:"Dashrath",
  //   lastName:"Chawda",
  //   UserId:{
  //     permanent_address:"Halvad" , 
  //     current_address:"Halvad" ,
  //   }
  // },
  // {
  //   include:[ 'Contact' ]
  // },
  // );
  // console.log(users);
  // return res.status(200).json({ data:users });
}


const getoneTooneUser = async(req , res) => {
  let user = await User.findAll({ 

    where:{ id:[6,7] },
    include:Contact , 
  });

  return res.json({ success:true , data:user })
}

const createOnetoMany = async(req , res) => {
  // const team_name = req.body
  // const teams = await Team.create(team_name);

  let playerData;

  // if(teams && teams.id){
     playerData = await Player.create({ name:"Ravi" , TeamId:2 })
  // }

  return res.status(200).json({
    success:true ,
    data:playerData
  })
}

const getOneToMany = async(req , res) => {
  let data = await Team.findAll({ include:Player });
  return res.json({ data : data });
}

const createManytoMany = async(req , res)=> {
  const actorData = await Actor.create({ actorName:"Hardev" , points:87 });
  const profileData = await Profile.create({ name:"Demo-Profile" });
  const mappedData =  await actorData.addProfile(profileData , { through:{ selfGranted:false } });

  return res.json({ data:actorData , data2:profileData , data3:mappedData });
}

const getManytoMany = async(req , res) => {
  const result = await Profile.findAll({ 
      where:{ id:[5 , 6] } ,
      attributes:['id' , 'name'],
      // attributes:['actorName' , 'points' ] , 

      include:[{
        model:Actor, 
        attributes:['actorName' , 'points' ] , 
        // attributes:['id' , 'name']
      }
      ]

      // include:Profile,
      // attributes:{
      //   exclude:['actorName'  , 'points'],
      // }
    });

  return res.json({ success:true , data:result });
}

const RawQueris = async(req , res) => {
  let sql = `select * from Users where id in (:id)`;

  let [result] = await db.sequelize.query(sql , {
    // ---> Below Comments gie only First Record <---
    // type:QueryTypes.SELECT,
    // nest:true,
    raw:true,
    replacements:[3],
    replacements:{ id:[1,3] },
  });
  console.log(result);
  return res.status(200).json({ data:result });
}


const FindorCreate = async(req , res) => {
  const [user , created] = await User.findOrCreate({
    where:{ firstName:"Abhishek" },
    defaults:{ firstName:"Meet" , lastName:"Rathod" }
  });
  console.log(user.firstName);
  console.log(user.lastName);

  console.log(created);

  if(created){
    console.log(user.lastName);
  }

  return res.json({ data:user })
};

const transactionData = async(req , res) => {
  const tn = db.sequelize.transaction();

  try {
    let user = await User.create(
    {
    firstName:"Bart",
    lastName:"Simpson",
    },
    {
      transaction:tn
    },
  );

  await user.addSibling(
    {
      firstName:'steven',
      lastName:'Simpson'
    },
    {
      transaction:tn
    }
  );
  await tn.commit();

  return res.json({ data:user }); 

  } catch (error) {
    // await tn.rollback();
    (await tn).rollback;
  }
}

module.exports = { 
  getUsers , getUser,
  createUser, 
  oneTooneUser,
  getoneTooneUser,
  createOnetoMany,
  getOneToMany,
  createManytoMany,
  getManytoMany,
  RawQueris,
  FindorCreate,
  transactionData
 };