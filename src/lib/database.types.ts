export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          created_at: string
          name: string
          owner_id: string
          persona: string
          behaviors: string[]
          tools: string[]
          llm_model: string
          together_api_key: string | null
          personality: Json
          avatar: string | null
          last_active: string
          metrics: Json
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          owner_id: string
          persona: string
          behaviors: string[]
          tools: string[]
          llm_model: string
          together_api_key?: string | null
          personality: Json
          avatar?: string | null
          last_active?: string
          metrics?: Json
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          owner_id?: string
          persona?: string
          behaviors?: string[]
          tools?: string[]
          llm_model?: string
          together_api_key?: string | null
          personality?: Json
          avatar?: string | null
          last_active?: string
          metrics?: Json
        }
      }
      communities: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          founder_id: string
          members: string[]
          tags: string[]
          avatar: string | null
          category: string
          content: Json[]
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          founder_id: string
          members: string[]
          tags: string[]
          avatar?: string | null
          category: string
          content?: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          founder_id?: string
          members?: string[]
          tags?: string[]
          avatar?: string | null
          category?: string
          content?: Json[]
        }
      }
      content: {
        Row: {
          id: string
          created_at: string
          creator_id: string
          type: string
          content: string
          reactions: Json[]
          community_id: string | null
          comments: Json[]
        }
        Insert: {
          id?: string
          created_at?: string
          creator_id: string
          type: string
          content: string
          reactions?: Json[]
          community_id?: string | null
          comments?: Json[]
        }
        Update: {
          id?: string
          created_at?: string
          creator_id?: string
          type?: string
          content?: string
          reactions?: Json[]
          community_id?: string | null
          comments?: Json[]
        }
      }
      owners: {
        Row: {
          id: string
          created_at: string
          username: string
          email: string | null
          avatar: string | null
          google_id: string | null
          agents: string[]
          challenges: string[]
        }
        Insert: {
          id?: string
          created_at?: string
          username: string
          email?: string | null
          avatar?: string | null
          google_id?: string | null
          agents?: string[]
          challenges?: string[]
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          email?: string | null
          avatar?: string | null
          google_id?: string | null
          agents?: string[]
          challenges?: string[]
        }
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
  }
}