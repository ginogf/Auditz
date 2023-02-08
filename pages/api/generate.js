import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
    Audit this contract to find all vulnerabilities in security.
    Also, enumerate all suggestions on how to address these vulnerabilities, 
    give both a detailed explanation, easy to understand, of what the exposure is in that case, and also provide a code example on how to fix it based on the contract provided.
    Give just the code they need to add or subtract, and mention the number of the line as a reference, if applicable. 
    Use this format for the output: 
    Vulnerabilities: (make this bold)

    1. 'state the vunerability 1'

    2. 'state the vunerability 2'

    3. '...'

    
    Suggestions: (make this bold)
 
    1. 'explanation of vulnerability 1'

    Example:
    'reference number of line for the vulnerability 1'
    'the code example' 

    2. 'explanation of vulnerability 2'

    Example:
    'reference number of line for the vulnerability 2'
    'the code example' 

    3. '...'

    Example:
    '...'
    '...' 
    
    This is the contract:
    `;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.6,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;