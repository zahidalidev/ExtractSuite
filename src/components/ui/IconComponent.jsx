const IconComponent = ({ icon: Icon }) => {
  if (typeof Icon === 'function') {
    return <Icon sx={{ fontSize: 24, color: 'inherit' }} />
  }
  
  return (
    <img 
      src={Icon} 
      alt="icon" 
      width={24} 
      height={24}
      style={{ display: 'block' }}
    />
  )
}

export default IconComponent
s