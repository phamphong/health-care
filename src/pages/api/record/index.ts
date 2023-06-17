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
        let { pageIndex, pageSize, type }: IPagingRequest & { type?: string } = req.body;
        let filter = !!type ? db.data.records.filter(k => k.title === type) : db.data.records;

        let total = filter.reduce((a, _b) => a + 1, 0);
        let start = (pageIndex - 1) * pageSize;
        let data = filter.slice(start, start + pageSize);

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