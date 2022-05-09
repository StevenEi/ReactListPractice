import React from 'react'

const Header = ({title}) => {
    
  return (
    <header>
        <h1>{title}</h1>
    </header>
  )
}

// if no title prop is passed down from App.js, this is used
Header.defaultProps = {
    title: "Default Title"
}

export default Header