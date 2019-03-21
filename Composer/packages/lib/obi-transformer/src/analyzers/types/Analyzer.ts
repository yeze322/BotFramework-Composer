export type AnalyzerTransformationProcess<InputSchema, IntermediaSchema> = {
  select: (input: InputSchema) => IntermediaSchema[];
  validate: (x: IntermediaSchema) => boolean;
  transform: (x: IntermediaSchema) => any;
};

export type AnalyzerTransformationCollection<InputSchema, IntermediaSchema> = {
  [feature: string]: AnalyzerTransformationProcess<InputSchema, IntermediaSchema>;
};

export type Analyzer<InputSchema, IntermediaSchema, ResultSchema> = {
  before: ((input: InputSchema) => boolean)[];
  after: ((result: ResultSchema) => boolean)[];
  transform: AnalyzerTransformationCollection<InputSchema, IntermediaSchema>;
};
