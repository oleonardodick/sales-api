import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

module.exports = async () => {
  execSync('npx prisma db push');
};
