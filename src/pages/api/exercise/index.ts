import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../mock/db';
import { IPagingRequest } from '../../../type/paging';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":

      try {
        await db.read();
        let { pageIndex, pageSize }: IPagingRequest = req.body;

        let total = db.data.exercises.reduce((a, _b) => a + 1, 0);
        let start = (pageIndex - 1) * pageSize;
        let data = db.data.exercises.slice(start, start + pageSize);

        res.json({
          pageSize,
          pageIndex,
          data,
          total,
        });

      } catch (error) {
        console.log(error);
        return res.status(400).end();
      }
    default:
      return res.status(405).end();
  }
}