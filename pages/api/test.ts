import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionSuccessStatus: 200
  })

  res.status(200).json({
    success: true,
    message: 'Hi'
  })
}

export default handler