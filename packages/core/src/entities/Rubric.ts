export interface RubricCriterion {
  id: string;
  description: string;
  maxScore: number;
}

export interface Rubric {
  id: string;
  criteria: RubricCriterion[];
}