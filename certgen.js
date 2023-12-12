import express from "express";
import { dirname } from 'path';
const app = express();
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.listen(80, () => {
    console.log('HTTP server running on port 80');
});
