import * as bcrypt from 'bcrypt';

export async function verifyData(
  data: string,
  hashedData: string,
): Promise<boolean> {
  return await bcrypt.compare(data, hashedData);
}
