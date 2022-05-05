const Alert = ({ children }) => {
  return (
    <div className="text-center text-white my-4 bg-red-600 p-3 uppercase">
      {children}
    </div>
  )
}

export default Alert