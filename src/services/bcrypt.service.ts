import bcryptjs from 'bcryptjs';

class BcryptService {
  // Hashes the password
  public  async hash(password: string): Promise<string | false> {
    try {
      const salt = await bcryptjs.genSaltSync(10);
      const hash = await bcryptjs.hashSync(password, salt);
      return hash;
    } catch (error) {
      console.error('Hashing error: ', error);
      return false;
    }
  }

  // Compares the passwords
  public  async compare(pass: string, hash: string): Promise<boolean> {
    try {
      const result = await bcryptjs.compareSync(pass, hash);
      return result;
    } catch (error) {
      console.error('Comparison error: ', error);
      return false;
    }
  }
}


export default new BcryptService();