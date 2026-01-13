import { isRouteErrorResponse, useRouteError, type ErrorResponse } from "react-router"

function ErrorComponent({ error }: { error: ErrorResponse | Error | unknown }) {
  return (
    <div className="p-8 flex flex-col gap-2 bg-danger-light rounded-[10px] m-4">
      <h1 className="text-3xl font-semibold">Error {isRouteErrorResponse(error) ? `${error.status}: ${error.statusText}` : 'Unknown'}</h1>
      <p className="font-light">{isRouteErrorResponse(error) ? error.data : 'Something went wrong. Please try again later.'}</p>
      {error instanceof Error && (
        <div className="mt-2 pt-6 border-t border-gray-light">
          <h2 className="text-lg font-semibold">The stack trace is:</h2>
          <pre>{error.stack}</pre>
        </div>
      )}
    </div>
  )
}

export default function RootErrorBoundary(){
  const error = useRouteError()

  return <ErrorComponent error={error} />
}