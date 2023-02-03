module.exports=(sequelize,DataTypes,Model)=>{
  class MapIdToSector extends Model {}
  
  MapIdToSector.init({
    // Model attributes are defined here
    company_id:DataTypes.STRING,
    company_sector: DataTypes.STRING,
        
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'MapIdToSector' // We need to choose the model name
  });
  return MapIdToSector;
  // the defined model is the class itself
  // console.log(Match === sequelize.models.User);
};
  