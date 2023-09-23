const express = require('express');
const Book = require('../models/book');

const router = express.Router();

router.get('/seed', (req, res) => {
    Book.insertMany([
        {
            "title": "The Shinobi Initiative",
            "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
            "year": 2014,
            "quantity": 10,
            "imageURL": "https://imgur.com/LEqsHy5.jpeg"
        },
        {
            "title": "Tess the Wonder Dog",
            "description": "The tale of a dog who gets super powers",
            "year": 2007,
            "quantity": 3,
            "imageURL": "https://imgur.com/cEJmGKV.jpg"
        },
        {
            "title": "The Annals of Arathrae",
            "description": "This anthology tells the intertwined narratives of six fairy tales.",
            "year": 2016,
            "quantity": 8,
            "imageURL": "https://imgur.com/VGyUtrr.jpeg"
        },
        {
            "title": "Wâˆ€RP",
            "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
            "year": 2010,
            "quantity": 4,
            "imageURL": "https://imgur.com/qYLKtPH.jpeg"
        }
    ])
    .then(() => res.status(200).json({message: 'Seed successful'}))
    .catch(error => {
        console.error("Error seeding data:", error);
        res.status(400).json({message: 'Seed unsuccessful'});
    });
});



router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred fetching all books.' });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred fetching the book.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred updating the book.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred deleting the book.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred adding the book.' });
    }
});


module.exports = router;
