const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

async function connect(uri){
    
    await mongoose.connect(
        uri, 
        {
          useNewUrlParser: true,
        //   useFindAndModify: false,
        //   useUnifiedTopology: true
        }
      );
      console.log('[db] Conectada con éxito');
        
}

module.exports = connect;
// console.log(db);

