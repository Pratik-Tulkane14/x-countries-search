import React from 'react'
interface searchInput {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Search: React.FC<searchInput> = ({ search, setSearch }) => {
    return (
        <>
            <input className='search' placeholder='Search for countries' type='search' value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </>
    )
}

export default Search