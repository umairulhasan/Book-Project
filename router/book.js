const express = require('express');

const router = express.Router();



let book = {
    "1": {"author": "John", "title": "Doe", "review": {}},
    "2": {"author": "Anna", "title": "Smith", "review": {}},
    "3": {"author": "Peter", "title": "Jones", "review": {}},
    "4": {"author": "Peter", "title": "Jones", "review": {}},
    "5": {"author": "Peter", "title": "Jones", "review": {}}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{

    // Update the code here 
  
    res.send(book);//This line is to be replaced with actual return value
  });

  router.get("/",async(req,res)=>{

    try{
const allBooks = await new Promise((resolve, reject)=>{

    setTimeout(()=>{
        resolve(book)
    },100)

    res.json(allBooks)
})
    }catch(error){
        res.status(500).json({ error: "Failed to retrieve books" });
    }
  });

// get by isbn (id)
router.get("/:ISBN", (req, res) => {
    const isbn = req.params.ISBN;
    const bookDetails = book[isbn]; // Access the specific book using the ISBN

    if (bookDetails) {
        res.send(bookDetails); // Send the book details if found
    } else {
        res.status(404).send("Book not found"); // Handle case where book is not found
    }
});

// get by auther name op
router.get("/author/:authorName", (req, res) => {
    const authorName = req.params.authorName.toLowerCase();
    const booksByAuthor = [];

    // Loop through the books to find matches by author
    for (let id in book) {
        if (book[id].author.toLowerCase() === authorName) {
            booksByAuthor.push(book[id]);
        }
    }

    if (booksByAuthor.length > 0) {
        res.send(booksByAuthor);
    } else {
        res.status(404).send("Author not found");
    }
});

// get review

router.get("/review/:id" , (req,res)=>{
    const id = req.params.id ;
    const reviewDetail = book[id] ;
if(reviewDetail){
    res.json(reviewDetail.review)
}
})



// POST request: Add or modify a review for a specific book by ID using query parameters
router.post("/addReview", (req, res) => {
    const id = req.body.id;
    const newReview = req.body.review;

    if (book[id]) {
        book[id].review = newReview;
        res.json(book[id].review);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});



// for delete book revirw

router.delete("/:id", (req, res) => {
    // Update the code here
    const id = req.params.id;
    if (Object.keys(book[id].review).length !== 0) {
        // Clear the review
        book[id].review = {};
        res.json({ message: `Review for book ID ${id} has been deleted.` });
    } else {
        res.status(404).json({ message: "No review found to delete." });
    }
} 

  );
  
  module.exports=router;