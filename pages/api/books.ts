// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from '../../utils/server';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  const query = req.query;
  const { categoryId, page, size } = query;
  axios.get(`/fee-assessment-books`, { params: { categoryId, page, size } })
    .then(response => {
      return res.status(response.status).json(response.data)
    })
    .catch(error => {
      throw res.status(error.response.status).json(error);
    })
}
