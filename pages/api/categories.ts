// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from '../../utils/server';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: number,
  name: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  axios.get(`/fee-assessment-categories`)
    .then(response => {
      res.status(response.status).json(response.data)
    })
    .catch(error => {
      throw res.status(error.status).json(error);
    })
}
