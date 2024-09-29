import knex from "@/clients/knex";


export default async (req: any, res: any) => {
  if (req.method === "GET") {
    const rows = await knex.select('*').from("palettes").limit(100);

    res.status(200).json(rows);
  } else {
    res.status(404).json({ error: `${req.method} endpoint does not exist` });
  }
};
