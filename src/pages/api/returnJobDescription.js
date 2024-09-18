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
            content: `Please create a fantasy story in ${numPanels} centered on ${idea}. 
            The character descriptions are ${characters}. For each panel, provide a single sentence describing both the setting and the action in fewer than 20 words. 
            Ensure each scene clearly integrates the setting and action into a straightforward sentence using simple language. 
            Each scene should have a distinct and clear setting. 
            Example of comic description: Panel 1: Raya and Finn stand at the edge of a dense jungle, sunlight filtering through the trees as Raya holds an old treasure map. 
            Panel 2: Finn clears thick vines with a machete while Raya, with keen gray eyes, carefully follows the map's directions. 
            Panel 3: They uncover a moss-covered stone pedestal hidden by vines, with Raya brushing away the foliage to reveal ancient symbols. 
            Panel 4: Raya presses the symbols on the pedestal, causing a hidden compartment to click open and reveal a dusty key. 
            Panel 5: Finn shines a flashlight into the jungle’s dense undergrowth, revealing a narrow, hidden path leading to a concealed cave entrance. 
            Panel 6: Inside the cave, Raya and Finn find an ornate chest on a stone pedestal, their faces glowing with excitement and anticipation.',
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
