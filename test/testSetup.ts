import * as path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.test') });
import { execSync } from 'child_process';

module.exports = async function testSetup() {
  console.log('Criando o schema test');
  execSync('npx prisma migrate deploy');
  // execSync('npm run migrate:deploy');
};
