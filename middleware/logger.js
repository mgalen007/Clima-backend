import express from 'express'

const log = (req, res, next) => {
    const date = (new Date).toLocaleDateString()
    const time = (new Date).toLocaleTimeString()
    const method = req.method
    const url = req.url
    const ipAddress = req.ipAddress
    console.log(`[${date} ${time}] [${ipAddress}]: ${req.method} ${req.url}`)
}

export default log

