// features/emailGenerator/types/index.ts

export interface LeadDetails {
    id: number;
    lead_company: string|null;
    lead_name: string|null;
    lead_email: string|null;
    lead_industry?: string|null;
    lead_title: string|null;
    lead_company_description: string|null;
}

export interface Persona {
    id: number;
    persona_name: string|null
    persona_description: string|null
    persona_company: string|null
    persona_services: string|null
}

export interface Others {
    calendly_link: string;
}