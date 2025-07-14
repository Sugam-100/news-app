export default async function handler(req, res) {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  const apiKey = 'c3ae1edacc0042588c90e300fedc2a9b'; // ✅ Keep this safe here
  const url = `https://newsapi.org/v2/everything?q=${location}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
