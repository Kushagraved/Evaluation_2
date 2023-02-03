module.exports=(sequelize,DataTypes,Model)=>{
  class CompanyInfo extends Model {}
    
  CompanyInfo.init({
    // Model attributes are defined here
    id:{
      type:DataTypes.TEXT,
      primaryKey:true
    },
    name: DataTypes.STRING,
    description:DataTypes.STRING,
    ceo: DataTypes.STRING,
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    score:DataTypes.DOUBLE
          
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'CompanyInfo' // We need to choose the model name
  });
  return CompanyInfo;
  // the defined model is the class itself
  // console.log(Match === sequelize.models.User);
};
    