import { createApp } from "./config/app";


const PORT = 3000;
const app = createApp();

app.listen(PORT, () => {
    console.log(`✅ Servidor online na rota: http://localhost:${PORT}`);
})