import type { StorageError } from '@supabase/storage-js'

export const useFetchStorageComposable = () => {
  const toast = useToast()
  const client = useSupabaseClient()

  /**
   * ! Storage Data !
   */

  const loadStorage = async (storage: string, imageName: string) => {
    const { data } = await client
      .storage
      .from(storage)
      .getPublicUrl(imageName)

    return data.publicUrl
  }

  const uploadStorage = async (storage: string, path: string, file: File | Blob, contentType?: string) => {
    const { error } = await client
      .storage
      .from(storage)
      .upload(path, file, {
        contentType: contentType ?? 'text/plain;charset=UTF-8',
        cacheControl: '3600',
        upsert: true,
      })

    errorHandler('uploadStorage', error)
  }

  const deleteStorage = async (storage: string, folder: string, path: string) => {
    const { error } = await client
      .storage
      .from(storage)
      .remove([`${folder}${path}`])

    errorHandler('deleteStorage', error)
  }

  const errorHandler = (fetchName: string, error: StorageError | null) => {
    if (error) {
      toast.add({ title: error.message, description: `at ${fetchName}`, color: 'error' })
    }
  }

  return {
    loadStorage,
    uploadStorage,
    deleteStorage,
  }
}
