import express, { text } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { InferenceClient } from '@huggingface/inference'
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT,()=>{
    console.log('server is running')
})
const client =new InferenceClient(process.env.API_TOKEN)
app.post('/analyse',async(req,res)=>{
    const {text}=req.body
        const result = await client.textClassification({
            model:'cardiffnlp/twitter-roberta-base-sentiment-latest',
            inputs:text
        })
        res.json({result})
        const dominantSentiment=result.sort((a,b)=>{
            return (b.score-a.score)[0]
        })

})