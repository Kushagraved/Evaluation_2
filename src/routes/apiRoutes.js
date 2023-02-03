const express=require('express');
const router=express.Router();
const {getCSV, getCompanyById, getCompanyBySector}=require('../controllers/getCSVController');

// /api
router.post('/save',getCSV);
router.get('/company/:id',getCompanyById);
router.get('/sector',getCompanyBySector);

// router.get('/companies',getTopRankedCompanies);
module.exports=router;