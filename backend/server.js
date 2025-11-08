const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

import express from "express";
import dotenv from "dotenv";
import shopifyRoutes from "./routes/shopify.js";

/**
 * Simple Express backend server
 * Save as: C:/Users/ludwi/OneDrive/Documents/GitHub/CP317/backend/server.js
 *
 * Features:
 * - dotenv support
 * - helmet, cors, morgan
 * - JSON body parsing
 * - basic in-memory CRUD API for "items"
 * - graceful shutdown and centralized error handling
 */

require('dotenv').config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/shopify", shopifyRoutes);

// In-memory store (replace with DB in production)
let nextId = 1;
const items = [];

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Root
app.get('/', (req, res) => res.json({ message: 'Backend server running' }));

// CRUD: /api/items
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) return next({ status: 404, message: 'Item not found' });
    res.json(item);
});

app.post('/api/items', (req, res, next) => {
    const { name, data } = req.body;
    if (!name || typeof name !== 'string') return next({ status: 400, message: 'Invalid or missing "name"' });
    const item = { id: nextId++, name: name.trim(), data: data ?? null, createdAt: new Date().toISOString() };
    items.push(item);
    res.status(201).json(item);
});

app.put('/api/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) return next({ status: 404, message: 'Item not found' });
    const { name, data } = req.body;
    if (name !== undefined) {
        if (!name || typeof name !== 'string') return next({ status: 400, message: 'Invalid "name"' });
        item.name = name.trim();
    }
    if (data !== undefined) item.data = data;
    item.updatedAt = new Date().toISOString();
    res.json(item);
});

app.delete('/api/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return next({ status: 404, message: 'Item not found' });
    const [deleted] = items.splice(idx, 1);
    res.json(deleted);
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    const status = err && err.status ? err.status : 500;
    const message = err && err.message ? err.message : 'Internal Server Error';
    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }
    res.status(status).json({ error: message });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
const shutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down...`);
    server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
    });
    // Force exit after timeout
    setTimeout(() => {
        console.error('Forcing shutdown.');
        process.exit(1);
    }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Export app for testing or external usage
module.exports = app;