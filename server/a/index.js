const { app } = require('./app');
const { dbConection } = require('./database');

async function main() {
    await dbConection();
    await app.listen(app.get('3150'));
}

main();