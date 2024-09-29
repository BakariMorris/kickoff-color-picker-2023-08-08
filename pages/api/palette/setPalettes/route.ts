import knex from "@/clients/knex";


export default async (req: any, res: any) => {
  if (req.method === "PUT") {
    let newPaletteID;
    await knex("palettes")
      .insert({
         colors: req.body.colors,
         name: req.body.name 
        })
      .then(async (id) => {newPaletteID = id});


    res.status(200).json(newPaletteID);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
