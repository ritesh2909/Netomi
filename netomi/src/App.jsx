import React, { useState, useEffect } from 'react';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);

    const [email, setEmail] = useState("")
    const [phn, setPhn] = useState("")
    const [name, setName] = useState("")
    const [dob, setDob] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            window.alert("Enter a valid name, Length between 4 to 10");
        }
        else if (!dob) {
            window.alert("Enter a valid Date of Birth");
        }
        else if (phn.length != 10) {
            window.alert("Enter a valid Contact Number");
        }
        else if (!selectedCountry) {
            window.alert("Select a valid country");
        }
        else if (!selectedState) {
            window.alert("Select a valid State");
        }
        else if (!email || (!/\S+@\S+\.\S+/.test(email))) {
            window.alert("Enter a valid email");
        }
        else {
            window.alert("Form filled successfully");
            window.location.reload();
        }

    }

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json')
            .then(res => res.json())
            .then(data => setCountries(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            setStates(selectedCountry.states);
        } else {
            setStates([]);
        }
    }, [selectedCountry]);

    return (


        <div className='container' style={{ "padding": "67px", "backgroundColor": "#ececec" }}>

            <form style={{ "padding": "20px" }} onSubmit={handleSubmit}>
                <div className="">Can you please provide your personel details?</div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={e => { setName(e.target.value) }} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Date of birth</label>
                    <input type="date" className="form-control" id="exampleInputPassword1" onChange={e => { setDob(true) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contact Number</label>
                    <input type="Number" className="form-control" id="exampleInputPassword1" onChange={e => { setPhn(e.target.value) }} />
                </div>



                <label htmlFor="exampleInputEmail1" className="form-label">Country</label>
                <br />
                <select onChange={e => setSelectedCountry(countries.find(country => country.name === e.target.value))}>
                    <option value="">Select a country</option>
                    {countries.map(country => (
                        <option key={country.name} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>

                {selectedCountry && (
                    <div>
                        <label htmlFor="exampleInputEmail1" className="form-label">States</label>
                        <br />
                        <select onChange={e => setSelectedState(states.find(state => state.name === e.target.value))}>
                            <option value="">Select a state</option>
                            {states.map(state => (
                                <option key={state.name} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >Email</label>
                    <input type="email" className="form-control" id="exampleInputPassword1" onChange={e => { setEmail(e.target.value) }} />
                </div>
                <br />
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
};


export default App;
