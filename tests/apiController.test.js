const apiServices = require('../src/services/apiServices');


describe('get company by id',() => {
  it('should return company details', async () => {
    jest.spyOn(apiServices, 'getCompanyByIdService').mockResolvedValue([{
    }]);
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }; 
    await categoryController.getCategories(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([{
      'id': 1,
      'name': 'Electronics',
      'description': 'Electronics',
      'attributes': [
        'color',
        'size'
      ],
      'createdAt': '2021-02-01T07:19:12.424Z',
      'updatedAt': '2021-02-01T07:19:12.424Z'
    }]);
  });
});

