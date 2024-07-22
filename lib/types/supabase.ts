export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_personas: {
        Row: {
          created_at: string
          id: number
          persona_company: string | null
          persona_description: string | null
          persona_name: string | null
          persona_services: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          persona_company?: string | null
          persona_description?: string | null
          persona_name?: string | null
          persona_services?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          persona_company?: string | null
          persona_description?: string | null
          persona_name?: string | null
          persona_services?: string | null
        }
        Relationships: []
      }
      campaign_templates: {
        Row: {
          activate_cron: boolean | null
          campaign_body: string | null
          campaign_subject: string | null
          campaign_template_name: string | null
          created_at: string
          follow_up_limit: number | null
          follow_up_schedule: string | null
          follow_up_start: string | null
          id: number
          lead_id: number | null
        }
        Insert: {
          activate_cron?: boolean | null
          campaign_body?: string | null
          campaign_subject?: string | null
          campaign_template_name?: string | null
          created_at?: string
          follow_up_limit?: number | null
          follow_up_schedule?: string | null
          follow_up_start?: string | null
          id?: number
          lead_id?: number | null
        }
        Update: {
          activate_cron?: boolean | null
          campaign_body?: string | null
          campaign_subject?: string | null
          campaign_template_name?: string | null
          created_at?: string
          follow_up_limit?: number | null
          follow_up_schedule?: string | null
          follow_up_start?: string | null
          id?: number
          lead_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_templates_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      email_tokens: {
        Row: {
          created_at: string
          email: string
          id: number
          provider: string | null
          tokens: Json | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: never
          provider?: string | null
          tokens?: Json | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: never
          provider?: string | null
          tokens?: Json | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          id: number
          lead_annual_revenue: string | null
          lead_company: string | null
          lead_company_description: string | null
          lead_current_company: string | null
          lead_email: string | null
          lead_employees: string | null
          lead_founded_year: string | null
          lead_industry: string | null
          lead_landline_number: string | null
          lead_mobile_number: string | null
          lead_name: string | null
          lead_social_media_accounts: Json | null
          lead_title: string | null
          lead_websites: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: never
          lead_annual_revenue?: string | null
          lead_company?: string | null
          lead_company_description?: string | null
          lead_current_company?: string | null
          lead_email?: string | null
          lead_employees?: string | null
          lead_founded_year?: string | null
          lead_industry?: string | null
          lead_landline_number?: string | null
          lead_mobile_number?: string | null
          lead_name?: string | null
          lead_social_media_accounts?: Json | null
          lead_title?: string | null
          lead_websites?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: never
          lead_annual_revenue?: string | null
          lead_company?: string | null
          lead_company_description?: string | null
          lead_current_company?: string | null
          lead_email?: string | null
          lead_employees?: string | null
          lead_founded_year?: string | null
          lead_industry?: string | null
          lead_landline_number?: string | null
          lead_mobile_number?: string | null
          lead_name?: string | null
          lead_social_media_accounts?: Json | null
          lead_title?: string | null
          lead_websites?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          image_url: string | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id?: string
          image_url?: string | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_emails: {
        Row: {
          active: boolean | null
          body: string | null
          created_at: string
          from_email: string | null
          id: number
          send_at: string | null
          subject: string | null
          to_email: string | null
        }
        Insert: {
          active?: boolean | null
          body?: string | null
          created_at?: string
          from_email?: string | null
          id?: never
          send_at?: string | null
          subject?: string | null
          to_email?: string | null
        }
        Update: {
          active?: boolean | null
          body?: string | null
          created_at?: string
          from_email?: string | null
          id?: never
          send_at?: string | null
          subject?: string | null
          to_email?: string | null
        }
        Relationships: []
      }
      tenants: {
        Row: {
          campaign_email: string | null
          created_at: string
          id: number
          profile_id: string
        }
        Insert: {
          campaign_email?: string | null
          created_at?: string
          id?: never
          profile_id: string
        }
        Update: {
          campaign_email?: string | null
          created_at?: string
          id?: never
          profile_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
