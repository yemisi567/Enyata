import { useState, useEffect, useCallback } from 'react'
import { documentService, Document } from '../lib/supabase'

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const docs = await documentService.getDocuments()
      setDocuments(docs)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load documents'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  const createDocument = useCallback(async (document: Omit<Document, 'created_at' | 'updated_at'>) => {
    try {
      const newDoc = await documentService.createDocument(document)
      setDocuments(prev => [newDoc, ...prev])
      return newDoc
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create document')
      throw err
    }
  }, [])

  const updateDocument = useCallback(async (id: string, updates: Partial<Document>) => {
    try {
      const updatedDoc = await documentService.updateDocument(id, updates)
      setDocuments(prev => prev.map(doc => doc.id === id ? updatedDoc : doc))
      return updatedDoc
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document')
      throw err
    }
  }, [])

  const deleteDocument = useCallback(async (id: string) => {
    try {
      await documentService.deleteDocument(id)
      setDocuments(prev => prev.filter(doc => doc.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document')
      throw err
    }
  }, [])

  const searchDocuments = useCallback(async (query: string) => {
    try {
      const results = await documentService.searchDocuments(query)
      return results
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search documents')
      return []
    }
  }, [])

  useEffect(() => {
    loadDocuments()
  }, [loadDocuments])

  return {
    documents,
    loading,
    error,
    loadDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    searchDocuments
  }
}
