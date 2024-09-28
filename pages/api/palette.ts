import knex from "../../clients/knex";


export default async (req: any, res: any) => {
  if (req.method === "GET") {
    const [palettes] = await knex("palettes");

    res.status(200).json(palettes);
  } else if (req.method === "PUT") {
    let newPaletteID;
    await knex("palettes")
      .insert({ colors: req.body.colors })
      .then(async (id) => {newPaletteID = id});


    res.status(200).json(newPaletteID);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }

 
};
