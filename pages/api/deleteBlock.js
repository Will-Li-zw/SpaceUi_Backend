import { deleteBlock } from '../../lib/redis';

export default async function handler(req, res) {
  const q = req.query.q;
  const result = await deleteBlock(q);
  res.status(200).json({ result });
}