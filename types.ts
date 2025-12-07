export type VerdictType = 'SAFE' | 'SCAM' | 'SUSPICIOUS' | 'UNCLEAR';

export type Language = 'English' | 'Bengali' | 'Hinglish';

export interface ScamAnalysisResult {
  verdict: VerdictType;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  risk_score: number; // 0 to 100
  reason: string; // Plain English explanation
  translated_reason?: string; // Explanation in selected language
  indicators: string[]; // List of red flags found
  action: string; // Recommended action (Block, Delete, Ignore)
}

export type AllergyType = 
  | 'Peanuts' 
  | 'Tree Nuts' 
  | 'Dairy' 
  | 'Eggs' 
  | 'Gluten/Wheat' 
  | 'Soy' 
  | 'Fish' 
  | 'Shellfish' 
  | 'Vegan' 
  | 'Vegetarian' 
  | 'Halal';

export interface UserProfile {
  allergies: AllergyType[];
  customRestrictions: string;
}

export interface CallerProfile {
  id: string;
  name: string;
  label: string;
}

export interface ProtocolConfig {
  type: 'CALL' | 'CRASH';
  delaySeconds: number;
  caller?: CallerProfile;
  crashType?: string;
}