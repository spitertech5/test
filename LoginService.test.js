// PROJ-123: Login service tests
describe('LoginService', () => {
  test('should return JWT for valid credentials', async () => {
    const mockRepo = {
      findByUsername: jest.fn().mockResolvedValue({
        id: 1, 
        username: 'test@example.com',
        password: 'validPassword'
      })
    };
    
    const service = new LoginService(mockRepo);
    const token = await service.login('test@example.com', 'validPassword');
    
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3); // JWT structure validation
  });

  test('should throw error for invalid credentials', async () => {
    const service = new LoginService({
      findByUsername: jest.fn().mockResolvedValue(null)
    });
    
    await expect(service.login('invalid', 'credentials'))
      .rejects
      .toThrow(InvalidCredentialsError);
  });
});