// --- ROUTER ---
import { isRouteErrorResponse, useRouteError, type ErrorResponse } from "react-router"

// --- COMPONENTS ---
import Heading from "../common/Heading"
import Paragraph from "../common/Paragraph"

function ErrorComponent({ error }: { error: ErrorResponse | Error | unknown }) {
  // --- ERROR DETAILS ---
  const errorTitle = isRouteErrorResponse(error) ? `${error.status}: ${error.statusText}` : 'Unknown'
  const errorMessage = isRouteErrorResponse(error) ? error.data : 'Something went wrong. Please try again later.'

  return (
    <div className="p-8 flex flex-col gap-2 bg-danger-light rounded-[10px] m-4">
      {/* --- ERROR TITLE --- */}
      <Heading level={1}>Error {errorTitle}</Heading>

      {/* --- ERROR MESSAGE --- */}
      <Paragraph>{errorMessage}</Paragraph>

      {/* --- ERROR STACK TRACE --- */}
      {error instanceof Error && (
        <div className="mt-2 pt-6 border-t border-gray-light">
          <Heading level={2}>The stack trace is:</Heading>
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