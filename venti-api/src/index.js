import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: '🌬️ Venti API is running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`API server running on port ${PORT}`))
