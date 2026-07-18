import { useNavigation } from 'react-router-dom'

type SubmitButtonProps = {
  children: string
  form?: string
}

export function SubmitButton({ children, form }: SubmitButtonProps) {
  const navigation = useNavigation()
  const busy = navigation.state === 'submitting'

  return <button className="button" disabled={busy} form={form}>{busy ? 'Saving…' : children}</button>
}
