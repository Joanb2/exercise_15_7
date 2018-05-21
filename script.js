class Stopwatch extends React.Component {
    constructor(display) { 
    	super(display);
    	this.state = {
    		display: display,
    		running: false,
    		times : {
    			minutes: 0,
            	seconds: 0,
            	milliseconds: 0
            },		
    	};
    }

	reset() {
        this.setState ({
        	times: {
	            minutes: 0,
	            seconds: 0,
	            milliseconds: 0
        	}
        });
    }

	format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.milliseconds))}`;
	}

	start() {
		if (!this.state.running) {
			this.setState({
				running: true
			});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
	}

	calculate() {
		
		let minutes = this.state.times.minutes,
			seconds = this.state.times.seconds,
			milliseconds = this.state.times.milliseconds

	    	milliseconds += 1;
	    if (milliseconds >= 100) {
	        seconds += 1;
	        milliseconds = 0;
	    }
	    if (seconds >= 60) {
	        minutes += 1;
	        seconds = 0;
	    }
	    this.setState({
	    	times: {
	    		minutes: minutes,
	    		seconds: seconds,
	    		milliseconds: milliseconds
	    	}
	    });

	}

	stop() {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}

	clear() {
		this.reset();
	}

	pad0(value) {
	    let result = value.toString();
	    if (result.length < 2) {
	        result = '0' + result;
	    }
	    return result;
	}

	render() {
		return (
			<div>
				<nav className="controls">
	      			<a href="#" className="button" id="start" onClick={this.start.bind(this)}>Start</a>
	      			<a href="#" className="button" id="stop" onClick={this.stop.bind(this)}>Stop</a>
	      			<a href="#" className="button" id="reset"onClick={this.reset.bind(this)}>Reset</a>
	    		</nav> 
	    		<div className="stopwatch">{this.format(this.state.times)}</div>
	    		<ul className="results"></ul>
    		</div>
    	)	
		
	}

}

ReactDOM.render(
	<Stopwatch />,
	document.getElementById('app')
);