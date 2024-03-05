// import express from "express";
// import router from "./Routesfldr/routes.js";
// import path from 'path';
// const app = express();
// const port = 3000;

// app.use(express.json({ limit: "50mb" }));
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/', router);

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });


import express from "express";
import router from "./Routesfldr/routes.js";
import { fileURLToPath } from 'url';
import cors from 'cors';
import { dirname, join } from 'path';
import bodyParser from "body-parser";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({limit:'50mb'}));
app.use(cors({
    methods:['GET','POST','PUT','DELETE']
}))
app.use('/', router);

// Serve static images
app.use('/images', express.static(join(__dirname, 'images')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
