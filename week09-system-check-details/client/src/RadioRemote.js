import React, { Component } from 'react';
import './App.css';


class RadioRemote extends Component {

    constructor(props){
        super(props);
        this.state = {
            allData: 'No Data to Display'
        };
    }

    handleSubmit= (event) => {
        this.setState({allData: ''});
        console.log('A name was submitted: ' , this.state);
        if (this.state.selectedValue === 'CpuInfo') {
            this.runCpuInfo(this.state.selectedValue);
        }
        else if (this.state.selectedValue === 'VersionCheck'){
            this.runVersionInfo(this.state.selectedValue);
        }
        event.preventDefault();
    };

    runCpuInfo = () => {
        const that = this;
        fetch('/script-pusher/copy-file')
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log('parsed json', json.allData);
                that.setState({allData: json.allData});
            })
            .catch(function (ex) {
                console.log('parsing failed, URL bad, network down, or similar', ex);
            });
    };



    render() {
        const radioWeb = (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="elf-form-field">
                            <legend id="services">Remote Services</legend>
                            <input
                                type="radio"
                                name="app-choice"
                                data-endpoint="0"
                                value="CpuInfo"
                                id="elf-radio-cpu"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="elf-radio-cpu">Uptime</label>

                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Run System Script
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
        return (
            <div className="App">

                <main>
                    <section>{radioWeb}</section>
                    <section>
                        <pre>{this.state.allData}</pre>
                    </section>

                </main>
            </div>
        );
    }
}

export default RadioRemote;
