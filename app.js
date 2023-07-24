const express=require('express');
const mongoose =require("mongoose")
const dotenv =require('dotenv');
const categorieRouter = require('./routes/categorie.route');
const scategorieRouter = require('./routes/scategorie.route');
const articleRouter =require("./routes/article.route");
const paymentRouter = require( "./routes/paiement.route")

dotenv.config()
const cors=require('cors')
const app = express();
//BodyParser Middleware
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD,{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {console.log("Connexion à la base de données réussie");
}).catch(err => {
console.log('Impossible de se connecter à la base de données', err);
process.exit();
});
app.get("/",(req,res)=>{
res.send("bienvenue tout le monde");
});
app.use("/api/categories",categorieRouter)
app.use("/api/scategories",scategorieRouter)
app.use("/api/articles",articleRouter)
app.use('/api/paiement', paymentRouter);
app.listen(process.env.PORT, () => {
console.log(`Server is listening on port ${process.env.PORT}`); });
module.exports = app;
