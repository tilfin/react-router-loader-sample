import { redirect } from 'react-router'
import { signOut } from '../../src/auth/auth'

export function clientAction() {
  signOut()
  return redirect('/login')
}
