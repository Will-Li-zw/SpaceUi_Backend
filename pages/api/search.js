import { searchBlocks } from '../../lib/redis';

export default async function handler(req, res) {
  const q = req.query.q;
  const blocks = await searchBlocks(q);
  res.status(200).json({ blocks });
}