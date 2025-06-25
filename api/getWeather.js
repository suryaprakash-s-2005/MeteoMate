import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default async function handler(req, res) {
  const { city } = req.query ;
  const apiKey = process.env.OPENWEATHER_API_KEY ;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required." });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.status !== 200) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
