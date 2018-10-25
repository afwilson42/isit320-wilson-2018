import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            allData: 'unknown'
        };
    }
    copyFile = () => {
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
        return (
            <div className="App">
                <header>
                    <h1>Copy File</h1>
                </header>
                <main>
                    <button onClick={this.copyFile}>Copy File</button>
                    <pre>{this.state.allData}</pre>
                </main>
                <footer>
                    <p>&copy; by Andrew Wilson</p>
                </footer>
            </div>
        );
    }
}

export default App;
