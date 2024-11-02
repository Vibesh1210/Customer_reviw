import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "./Models/client_model.js"
import "./Models/customer.js"
import "./Models/transaction.js"
import Client_model from './Models/client_model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
import customer_model from './Models/customer.js';
import {dirname} from "path";
import {fileURLToPath} from "url";
import path from 'path';
import transaction_model from './Models/transaction.js';

const App = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
App.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
App.use(express.json());
App.use(cookieParser());
App.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// App.use(bodyParser.urlencoded({extended:true}));
// console.log(__dirname);


const port = 4000;
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
const mongodburi = process.env.MONGODB_URI; 
const upload = multer({ dest: 'uploads/' });
mongoose.connect(mongodburi).then(() => {
    console.log("Connected to MONGODB");
})
    .catch((err) => {
        console.log("Failed to connect to MDB ", err);
    }

    );


App.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    try {

        const data = await Client_model.create({ username, password: bcrypt.hashSync(password, salt) });

        res.json(data);
        // res.redirect('http://localhost:3000/register');
        // res.sendStatus(200);

    }
    catch (err) {

        res.status(400).json(err);
    }

});

App.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const data = await Client_model.findOne({ username });
    if(data!==null){

        const flag = bcrypt.compareSync(password, data.password);
       
            if (flag === true) {
                jwt.sign({ username, id: data._id }, secret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({
                        username,
                        id: data._id,
                    });
                });
            }
    }
        else {
            res.status(400).json('Wrong Details'); 
        }
    
    // res.json(flag);


});
App.get('/user', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, user) => {
        if (err) throw err;
        res.json(user);
    })
    // res.json(req.cookies);
});

App.post('/add', upload.single('photo'), async (req, res) => {
    const { originalname, path } = req.file;
    // console.log(path);
    const ext = originalname.split('.').pop();
    const newpath = path + '.' + ext;
    fs.renameSync(path, newpath);

    const relativePath = '/uploads/' + req.file.filename + '.' + ext;
    const { token } = req.cookies;
    jwt.verify(token, secret, {},async (err, user) => {
        if (err) throw err;
        const { name, phone, pendingAmount } = req.body;
        const doc = await customer_model.create({
            name,
            phone,
            pendingAmount,
            photo: relativePath,
            userId:user.id
        })
        // console.log(user); 
        res.json(doc);
        // res.json(user);
    })

    // console.log(req);
});


App.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

App.get('/all',async (req,res)=>{
    const { token } = req.cookies;
    jwt.verify(token, secret, {},async (err, user) => {
        if (err) throw err;
        // res.json(user);
        try {
            const data =await customer_model.find({userId:user.id})
            .sort({createdAt: -1})
            .limit(20);
            // console.log(data);
            res.json(data); 
            
        } catch (error) {
            res.json(err); 
        }
    })
    // console.log(data);
});

App.post('/transaction/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const { amount, description} = req.body;
  
    try {
      // Create a new transaction
      const transaction = await transaction_model.create({
        customerId,
        amount,
        description,
      });
  
      // Update the customer's pending amount
      // Assuming "amount" is the amount the customer has paid or added
      console.log(amount);
      await customer_model.findByIdAndUpdate(customerId, {

        $inc: { pendingAmount: amount }, // Use negative value for decrement, positive for increment
      });
      
      res.json(transaction);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add transaction' });
    }
  });
  

// App.get('/all/:userId', async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const customers = await customer_model.find({ userId });
//         res.status(200).json(customers);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch customers' });
//     }

// })

App.get('/customer_transactions/:customerId', async (req, res) => {
    const { customerId } = req.params;
    
    try {
      // Fetch all transactions for the customer
      const transactions = await transaction_model.find({ customerId:customerId });
      
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  });
  


App.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





