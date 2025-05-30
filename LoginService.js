/**
 * PROJ-123: Authentication service
 * Implements JWT-based login functionality
 */
class LoginService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Authenticates user credentials
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<string>} JWT token
   * @throws {InvalidCredentialsError} When credentials are invalid
   */
  async login(username, password) {
    // PROJ-123: Implement credential validation
    const user = await this.userRepository.findByUsername(username);
    
    if (!user || user.password !== password) {
      throw new InvalidCredentialsError('Invalid username or password');
    }
    
    return this.generateJWT(user);
  }

  // PROJ-123: JWT generation method
  generateJWT(user) {
    const payload = {
      sub: user.id,
      name: user.fullName,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
    };
    
    return jwt.sign(payload, process.env.JWT_SECRET);
  }
}