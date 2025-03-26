import { ApiResponse } from '@/types/api/ApiResponse.types'
import { ProfileBase, UpdateProfileRequest } from '@/types/api/MyPage.types'

import { authProxy } from '@/app/api/auth/authProxy'

export const getProfile = async (): Promise<ApiResponse> => {
  return await authProxy.get(`v1/my-page/profile`).json()
}

export const updateProfile = async (
  data: UpdateProfileRequest,
  profileImage?: File
): Promise<ApiResponse> => {
  const formData = new FormData()
  formData.append('request', new Blob([JSON.stringify(data)]))

  if (profileImage) {
    formData.append('profileImage', profileImage)
  }

  return await authProxy
    .patch('v1/my-page/profile', {
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .json()
}
