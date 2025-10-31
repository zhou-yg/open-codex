import 'dotenv/config'
import { createFileFlow } from './flow/flows'


export async function createInDir (options: {
  dir: string
}) {

  
  await createFileFlow.process({
    dir: options.dir,
  })
  
}