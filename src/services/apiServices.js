const axios=require('axios');
const {CompanyInfo}=require('../../database/models');
const getCompanyByIdService=async({id})=>{
  const {data:companyDetails}=await axios.get(`http://54.167.46.10/company/${id}`);
  await CompanyInfo.create(companyDetails);
  return companyDetails;
};

module.exports={getCompanyByIdService};