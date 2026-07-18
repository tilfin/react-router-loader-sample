import { Form, isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText || 'Request failed'}`
    : 'Unexpected route error'

  return (
    <main className="page error-page">
      <p className="eyebrow">Route error</p>
      <h1>データを表示できませんでした</h1>
      <p>{message}</p>
      <Form method="get" action="/users"><button>ユーザー一覧へ戻る</button></Form>
    </main>
  )
}
