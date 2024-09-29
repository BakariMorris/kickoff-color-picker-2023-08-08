import knex from '@/clients/knex';

export default async (req:any, res: any) => {
  
  if(req.method === 'GET') {
    if(!req.query.searchTerm)
      return res.status(400).json({ message: 'Missing search query' });
    const matchingPalettes = await knex
    ('palettes')
    //Auto Escapes
    .whereLike('name', `%${req.query.searchTerm}%`);

    res.status(200).json(matchingPalettes);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};