const express = require('express');
const router = express.Router();
const Article=require("../models/article")
//const {verifyToken} =require("../middleware/verif-token")
//const { uploadFile } = require('../middleware/upload-file')
// chercher un article par s/cat
router.get('/scat/:scategorieID',async(req, res)=>{
    try {
    const art = await Article.find({ scategorieID:
    req.params.scategorieID}).exec();
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // afficher la liste des articles.
    router.get('/', async (req, res )=> {
    try {
    const articles = await 
    Article.find({}, null, {sort:{'_id': -1}}).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    
    // créer un nouvel article
    router.post('/', async (req, res) => {
    const nouvarticle = new Article(req.body)
    try {
    const response =await nouvarticle.save();
    const articles = await
    Article.findById(response._id).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    
    });
    // chercher un article
    router.get('/:articleId',async(req, res)=>{
    try {
    const art = await Article.findById(req.params.articleId);
    res.status(200).json(art);
} catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // modifier un article
    
    router.put('/:articleId', async (req, res)=> {
    try {
    const art = await Article.findByIdAndUpdate(
    req.params.articleId,
    { $set: req.body },
    { new: true }
    );
   const articles = await
    Article.findById(art._id).populate("scategorieID").exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // Supprimer un article
    router.delete('/:articleId', async (req, res)=> {
    const id = req.params.articleId;
    try {
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "article deleted successfully." });
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    module.exports = router;
    