const apiServices = require('../src/services/apiServices');
const {getCompanyById}=require('../src/controllers/getCSVController');
describe('get company by id',() => {
  it('should return company details', async () => {
    jest.spyOn(apiServices, 'getCompanyByIdService').mockResolvedValue({
      name:'Micrsoft',
    });
    const mockReq = {
      params:{
        id:2
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; 
    await getCompanyById(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      name:'Micrsoft',
    });
  });
});

