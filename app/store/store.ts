import { baseUrl } from '@/utilis/config'
import axios from 'axios'
import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  phone: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, phone: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password
      })

      const { token, user } = response.data
      set({
        token,
        user,
        isLoading: false,
        error: null
      })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || 'Login failed'
      })
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, {
        name,
        email,
        password,
        
      })

      const { token, user } = response.data
      set({
        token,
        user,
        isLoading: false,
        error: null
      })
    } catch (error: any) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || 'Registration failed'
      })
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoading: false,
      error: null
    })
  }
}))
