export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type BoardDatabase = {
  board: {
    Tables: {
      guestInquiry: {
        Row: {
          activated: boolean | null
          created_at: string
          deleted: boolean | null
          email: string | null
          id: string
          message: string | null
          updated_at: string | null
        }
        Insert: {
          activated?: boolean | null
          created_at?: string
          deleted?: boolean | null
          email?: string | null
          id?: string
          message?: string | null
          updated_at?: string | null
        }
        Update: {
          activated?: boolean | null
          created_at?: string
          deleted?: boolean | null
          email?: string | null
          id?: string
          message?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inquiryChannel: {
        Row: {
          activated: boolean | null
          admin_new_message: boolean | null
          channel_code: string | null
          created_at: string
          deleted: boolean | null
          id: string
          request_new_message: boolean | null
          request_user_id: string | null
          update_user_id: string | null
          updated_at: string | null
        }
        Insert: {
          activated?: boolean | null
          admin_new_message?: boolean | null
          channel_code?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          request_new_message?: boolean | null
          request_user_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Update: {
          activated?: boolean | null
          admin_new_message?: boolean | null
          channel_code?: string | null
          created_at?: string
          deleted?: boolean | null
          id?: string
          request_new_message?: boolean | null
          request_user_id?: string | null
          update_user_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      inquiryMessageList: {
        Row: {
          created_at: string
          deleted: boolean | null
          id: string
          inquiry_id: string | null
          message: string | null
          update_user_id: string | null
          updated_at: string | null
          write_type: string | null
        }
        Insert: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          inquiry_id?: string | null
          message?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          write_type?: string | null
        }
        Update: {
          created_at?: string
          deleted?: boolean | null
          id?: string
          inquiry_id?: string | null
          message?: string | null
          update_user_id?: string | null
          updated_at?: string | null
          write_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'inquiryMessageList_inquiry_id_fkey'
            columns: ['inquiry_id']
            isOneToOne: false
            referencedRelation: 'inquiryChannel'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'inquiryMessageList_inquiry_id_fkey'
            columns: ['inquiry_id']
            isOneToOne: false
            referencedRelation: 'viewInquiryChannel'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      viewInquiryChannel: {
        Row: {
          activated: boolean | null
          admin_new_message: boolean | null
          adminProfiles: Json | null
          channel_code: string | null
          created_at: string | null
          deleted: boolean | null
          id: string | null
          inquiryMessageList: Json | null
          request_new_message: boolean | null
          request_user_id: string | null
          requestUserProfiles: Json | null
          update_user_id: string | null
          updated_at: string | null
        }
        Relationships: []
      }
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
    PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof PublicSchema['CompositeTypes']
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
