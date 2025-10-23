export function AuthSeparator() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-t-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm font-medium">
        <span className="bg-white px-6 text-gray-500">Or continue with</span>
      </div>
    </div>
  )
}
