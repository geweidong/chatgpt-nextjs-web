import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post } from './axios'

export function fetchChatAPIProcess<T = any>(params: {
  prompt: string
  options?: { conversationId?: string; parentMessageId?: string }
  signal?: GenericAbortSignal
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
}) {
  // const settingStore = useSettingStore()

  return post<T>({
    url: '/chatgpt',
    data: { prompt: params.prompt, options: params.options },
    // data: { prompt: params.prompt, options: params.options, systemMessage: settingStore.systemMessage },
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}
