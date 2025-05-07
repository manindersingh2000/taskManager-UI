import { useState } from "react"



const SearchBar = () => {

    const [searchBar, setSearchBar] = useState([])


  return (
    <div>   
      <input type="text"
      value={searchBar} 
      onChange={(e) => setSearchBar(e.target.value)}/>
    </div>
  )
}

export default SearchBar
