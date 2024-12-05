import express, { Request, Response } from 'express';
import cors from "cors" ;
import { getFromCID, putCIDHelia } from './pinata';

const app = express()
const port = 3000
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/getFromCID/:CID', async (req: Request, res: Response) => {
  res.send(await getFromCID(req.params.CID))
})

app.post('/iExecStore', async (req: Request, res: Response) => {
  res.send(await getFromCID(req.params.CID))
})

app.get('/putCIDHelia/:data', async (req: Request, res: Response) => {
  res.send(await putCIDHelia(req.params.data))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
