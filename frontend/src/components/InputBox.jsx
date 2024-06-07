/* eslint-disable react/prop-types */
function InputBox({label, name, type, placeholder, value, onChange}) {
  return (
    <div className="py-2">
      <p className="font-medium">{label}</p>
      <input className="w-full mb-1 border-b-2 focus:outline-none focus:border-blue-600" type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} required/>
    </div>
  )
}

export default InputBox