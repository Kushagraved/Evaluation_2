const axios=require('axios');
const CSV = require('csv-string');
const {MapIdToSector,CompanyInfo}=require('../../database/models');
const apiServices=require('../services/apiServices');
const getCSV=async(req,res)=>{
  const {urlLink}=req.body;
  const {data}=await axios.get(urlLink);
  //   const json=[
  //     {
  //       'company_id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
  //       'company_sector': 'Automobile'
  //     },
  //     {
  //       'company_id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
  //       'company_sector': 'Software'
  //     },
  //     {
  //       'company_id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
  //       'company_sector': 'Automobile'
  //     },
  //     {
  //       'company_id': '8727cc61-8c4b-4285-8853-2db808392c04',
  //       'company_sector': 'Software'
  //     },
  //     {
  //       'company_id': 'e90a7bc7-47fa-49af-bfa1-391fe7768b56',
  //       'company_sector': 'Software'
  //     },
  //     {
  //       'company_id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
  //       'company_sector': 'Software'
  //     },
  //     {
  //       'company_id': 'ed4fc91d-8ac8-4882-a9e9-071a88423ca5',
  //       'company_sector': 'Retail'
  //     },
  //     {
  //       'company_id': 'c144e397-bef9-4aa1-aef4-842f4da44f9c',
  //       'company_sector': 'Retail'
  //     },
  //     {
  //       'company_id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
  //       'company_sector': 'Retail'
  //     },
  //     {
  //       'company_id': '296247ef-c553-4704-ad67-0878c87ff729',
  //       'company_sector': 'Banking'
  //     },
  //     {
  //       'company_id': 'c1634e16-17c8-42f6-8513-b8c50a4f230c',
  //       'company_sector': 'Banking'
  //     },
  //     {
  //       'company_id': 'e245b12c-5b3b-4a83-a4ad-391974b34a37',
  //       'company_sector': 'Banking'
  //     }
  //   ];

  const parsedCsv = CSV.parse(data);
  parsedCsv.shift();
  console.log(parsedCsv);
  const json=parsedCsv.map((arr)=>{
    return {
      'company_id':arr[0],
      'company_sector':arr[1]
    };
  });
  
  await MapIdToSector.bulkCreate(json);
  res.status(200).json({data:json});
}; 

const getCompanyById=async(req,res)=>{

  //   let {id}=req.params;
  //   const {data:companyDetails}=await axios.get(`http://54.167.46.10/company/${id}`);
  //   await CompanyInfo.create(companyDetails);
  //   console.log(companyDetails);
  try {
    let {id}=req.params;
    if(id===undefined || id===''){
      res.status(400).json({message:'invalid id'});
    }
    const companyDetails=await apiServices.getCompanyByIdService({id});
    res.status(200).json(companyDetails);
  } catch (error) {
    res.status(500).json(error);
  }


};

const getCompanyBySector=async(req,res)=>{
  console.log(req.query); 
  const {name}=req.query;
  let {data:companyDetails}=await axios.get(`http://54.167.46.10/sector?name=${name}`);

  const updatedCompanyDetails=companyDetails.map((company)=>{
    let totalPerformace=0;
    company.performanceIndex.forEach((company)=>{
      const {key,value}=company;
      //   console.log(key,val);
      if(key=='cpi'){
        totalPerformace+=(value)*10;
      }
      else if(key=='cf'){
        totalPerformace+=(value/1000);
      }
      else if(key=='mau'){
        totalPerformace+=(value*10);
      }
      else{
        totalPerformace+=value;
      }
    });
    
    totalPerformace=totalPerformace/4;
    // const x=await MapIdToSector.findOne({ where: { company_id: company.companyId }});
    // console.log(x);
    return {id:company.companyId,score:totalPerformace};
  });
  //   console.log(updatedCompanyDetails);

  //   updatedCompanyDetails.forEach(async(company)=>{
  //     await CompanyInfo.update(company,{
  //       where:{
  //         id:company.id
  //       }
  //     });
  //     console.log(company.id);
  //   });
  //   await CompanyInfo.bulkCreate(updatedCompanyDetails);




  res.status(200).json(updatedCompanyDetails);
};


// const getTopRankedCompanies=async(req,res)=>{

//   //   const {sector}=req.query;
//   //   CompanyInfo.findAll({
//   //     where
//   //   })

// //   res.status(200).json(req.query);
// };
module.exports={
  getCSV ,
  getCompanyById,
  getCompanyBySector,
 
};