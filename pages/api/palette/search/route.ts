import knex from '@/clients/knex';

export default async (req:any, res: any) => {
  
  if(req.method === 'GET') {
    console.log(req.query.searchTerm)
    const matchingPalettes = await knex
    ('palettes')
    .where({name: req.query.searchTerm})
    .select('*');

    res.status(200).json(matchingPalettes);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};