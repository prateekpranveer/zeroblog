export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, comment, postId } = req.body;

    // Basic server-side validation
    if (!name || !email || !comment || !postId) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const mutation = {
      mutations: [
        {
          create: {
            _type: 'comment',
            name,
            email,
            comment,
            post: { _type: 'reference', _ref: postId },
          },
        },
      ],
    };

    const sanityResponse = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/production`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(mutation),
    });

    if (!sanityResponse.ok) {
      console.error(await sanityResponse.text());
      return res.status(500).json({ message: 'Sanity mutation failed.' });
    }

    res.status(200).json({ message: 'Comment submitted successfully. Awaiting approval.' });
  } catch (error) {
    console.error('Error submitting comment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
