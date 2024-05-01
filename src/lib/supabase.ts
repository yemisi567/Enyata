import { createClient } from '@supabase/supabase-js'
import { SUPABASE_CONFIG } from '../config/supabase'

if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
  throw new Error('Supabase configuration is incomplete')
}

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
  auth: {
    persistSession: false
  }
})

export interface Document {
  id: string
  title: string
  content: any[]
  last_modified: string
  is_starred: boolean
  is_archived: boolean
  tags: string[]
  word_count: number
  created_at?: string
  updated_at?: string
}

export const testConnection = async () => {
  try {
    const { error } = await supabase
      .from('documents')
      .select('count')
      .limit(1)
    return !error
  } catch (err) {
    return false
  }
}

export const documentService = {
  async getDocuments(): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('last_modified', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getDocument(id: string): Promise<Document | null> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  },

  async createDocument(document: Omit<Document, 'created_at' | 'updated_at'>): Promise<Document> {
    const { data, error } = await supabase
      .from('documents')
      .insert([document])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateDocument(id: string, updates: Partial<Document>): Promise<Document> {
    const { data, error } = await supabase
      .from('documents')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteDocument(id: string): Promise<void> {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async searchDocuments(query: string): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .or(`title.ilike.%${query}%`)
      .order('last_modified', { ascending: false })

    if (error) throw error
    return data || []
  }
}
