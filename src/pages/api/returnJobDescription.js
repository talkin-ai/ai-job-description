const generateDescription = async ({
  characters,
  idea,
  numPanels,
}) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a hiring manager for a company that is looking to hire a new employee. You need to write a job description for a job posting. The job description should be SEO friendly and should highlight the unique features and benefits of the job position.",
          },
          {
            role: "user",
            content: `Please create a fantasy story in ${numPanels} panels centered on ${
              idea
            }. The character description are ${characters}. For each panel, provide a single sentence describing both the setting and the action in fewer than 15 words.
              Ensure each scene clearly integrates the setting and action into a straightforward sentence using simple language. 
            Each scene should have a distinct and clear setting. Try to begin each scene description with the character. One scene one row. Panel descriptor and summarization are unnecessary. No paragraph spacing.",
            `,
          },
        ],
        max_tokens: 300,
        temperature: 0.5,
      }),
    });
    const data = await response.json();

    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
};

export default async function handler(req, res) {
  const { characters, idea, numPanels } = req.body;

  const storyDescription = await generateDescription({
    characters,
    idea,
    numPanels,
  });

  res.status(200).json({
    storyDescription,
  });
}
