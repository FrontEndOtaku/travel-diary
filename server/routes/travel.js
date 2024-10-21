const express = require('express');
const Travel = require('../models/Travel');
const multer = require('multer');
const path = require('path');

const router = express.Router();


// Настройка хранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Измените маршрут для добавления путешествия
router.post('/', upload.array('images'), async (req, res) => {
    const { userId, location, cost, heritageSites, attractions } = req.body;

    const images = req.files.map(file => file.path); // Получаем пути к загруженным изображениям

    const newTravel = new Travel({ userId, location, images, cost, heritageSites, attractions });

    try {
        await newTravel.save();
        res.status(201).json(newTravel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Получение всех путешествий
router.get('/', async (req, res) => {
    try {
        const travels = await Travel.find().populate('userId', 'username'); // Показать имя пользователя
        res.json(travels);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
