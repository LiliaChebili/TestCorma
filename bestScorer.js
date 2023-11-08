const fs = require('fs');
const csvParser = require('csv-parser');

const filePath = '/Users/LiliaChebili/goalscorers.csv';
const result = [];

fs.createReadStream(filePath)
  .pipe(csvParser())
  .on('data', (ligne) => {
    if( !result.find( joueur => joueur.nom==ligne.scorer ) )
    {  result.push( { nom:ligne.scorer, but:0 } );  };
    
    result.forEach(element => {
        if(element.nom == ligne.scorer)
        {element.but += 1;}
    });

  })
  .on('end', () => {
    console.log("le meilleur joueur est :");
    console.log(result.sort( (a,b) => b.but - a.but )[0]);
  });

