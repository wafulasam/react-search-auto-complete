import React, { useState , useMemo} from "react";
import "./search.css";
import axios from "axios";
import debounce from 'lodash.debounce';

const Search = () => {
    const [ countries, setCountries ] = useState('');
    const [ search, setSearch ] = useState('');

    
    function fetchCountries (e) {
        setSearch(e.target.value);
        axios.get(`https://restcountries.com/v3.1/name/${e.target.value}`)
            .then((res) => {
                setCountries(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const debouncedChangeHandler = useMemo(() => {
        return debounce(fetchCountries, 300);
    }, []);


    return (
        <div className="wrapper">
            <div className="control">
                <h3>Search country</h3>
                <input 
                    className="input" 
                    type="text" 
                    onChange={debouncedChangeHandler}
                />
            </div>
            {search && (
                <div className="list">
                    {countries ? countries.map(country => (
                        <div onClick={()=> alert(country.name.common)} className="item"  key={country.name.common}>
                            {country.name.common}
                        </div>
                    )) : null }
                </div>
            )}
        </div>
    )
}
export default Search