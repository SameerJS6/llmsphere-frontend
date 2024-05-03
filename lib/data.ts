export const types = ['GPT', 'Gemini', 'AWS Bedrock'] as const;

export type ModelType = (typeof types)[number];

export interface Model<Type = string> {
  id: string;
  name: string;
  description: string;
  strengths?: string;
  type: Type;
}

export const models: Model<ModelType>[] = [
  {
    id: 'b9c774f3-34fe-4d9f-9de3-f673f67f5504',
    name: 'gpt-4',
    description:
      'Enhanced capabilities over previous models, including better understanding of nuanced prompts, more detailed and context-aware responses, and improved safety features. It provides high-quality completions across a wide range of tasks.',
    type: 'GPT',
    strengths:
      'Advanced reasoning, detailed knowledge across domains, sophisticated language understanding, ethical response handling, diverse content generation',
  },
  {
    id: '1b9a622f-8c16-404f-9071-fb0a80f1a1bf',
    name: 'gpt-3.5-turbo',
    description:
      'An improved version of GPT-3 models with faster response times and lower cost, while maintaining a high level of performance across a variety of tasks.',
    type: 'GPT',
    strengths:
      'Efficiency, broad knowledge, cost-effective, versatile applications',
  },
  {
    id: 'e4037316-975e-44e8-a2f8-b2fe5e3458db',
    name: 'chatgpt',
    description:
      'Specialized model for generating conversational responses. Tuned to provide more contextually appropriate and engaging dialogue based on a conversational history.',
    type: 'GPT',
    strengths:
      'Conversational context, engaging interactions, human-like responses',
  },
  {
    id: '56ef2c78-918e-4c64-a025-95b9655b2bb2',
    name: 'davinci-codex',
    description:
      'Designed to understand and generate code, this model offers deep knowledge of programming languages and coding techniques, making it ideal for coding applications and software development.',
    type: 'GPT',
    strengths:
      'Code generation, problem-solving in programming, understanding software contexts',
  },
  {
    id: '8a234f89-b1b4-41da-9d8d-5a4e54958c97',
    name: 'google-gemini',
    description:
      "Google's cutting-edge conversational AI designed for more natural interactions and deeper understanding of context, improving over previous models in understanding nuances.",
    type: 'Gemini',
    strengths:
      'Deep contextual understanding, natural language processing, human-like conversation',
  },
  {
    id: '7d3b34f2-4a9e-47c1-bb97-78f7c56aabb3',
    name: 'azure-openai',
    description:
      "Microsoft's integration of OpenAI models offering cloud-based AI capabilities that leverage GPT technology for a range of applications including data analysis and customer support.",
    type: 'GPT',
    strengths: 'Scalability, enterprise integration, cloud optimization',
  },
  {
    id: '0fb34567-d93c-467b-9795-58e29b5c3ef3',
    name: 'aws-bedrock',
    description:
      "AWS's platform for embedding machine learning models into applications, focusing on providing stable, scalable machine learning solutions with robust data handling.",
    type: 'AWS Bedrock',
    strengths:
      'Data security, high scalability, integration with AWS ecosystem',
  },
];
