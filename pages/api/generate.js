import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "Audit this contract to find all vulnerabilities in security. Also nummerate all suggestions on how to address these vulnerabilities, give both a simple explanation easy to understand and also give a code exaple on how to fix it based on the code povided, without saying simple or code, give just the code they need to add or substract. Use this format for the output: Vulnerabilities:<br/>'state the vunerabilities 'Suggestions: 'the simple explanation' Example: 'the code example' This is the contract:";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;