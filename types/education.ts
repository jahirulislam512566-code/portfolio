export interface Education {
  id: string | number;
  institution: string;
  institutionWebsite?: string;
  institutionLogo?: string;
  degree: string;
  field: string;
  startDate: Date | string;
  endDate?: Date | string;
  isCurrent: boolean;
  grade?: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  courses?: string[];
  location?: string;
}

export interface Course {
  id: string | number;
  name: string;
  provider: string;
  providerWebsite?: string;
  completionDate?: Date | string;
  duration?: string;
  certificateUrl?: string;
  skills?: string[];
  description?: string;
  educationId?: string;
}

export interface Certification {
  id: string | number;
  name: string;
  issuer: string;
  issuerWebsite?: string;
  issueDate: Date | string;
  expirationDate?: Date | string;
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
  description?: string;
  educationId?: string;
}

export interface EducationFilter {
  institution?: string;
  degree?: string;
  field?: string;
  isCurrent?: boolean;
}