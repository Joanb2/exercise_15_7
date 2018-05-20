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
        console.log('workreset');
    }

    print() {
        this.times.display.innerText = this.format(this.times);
        console.log('workprint');
	}

	format(times) {
        return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.milliseconds))}`;
        console.log('workformat');
	}

	start() {
		if (!this.state.running) {
			this.setState({
				running: true
			});
			this.watch = setInterval(() => this.step(), 10);
			console.log('workstart');
		}
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
		this.print();
		console.log('workstep');
	}

	calculate() {
		if (!this.state.running) return;
		let minutes = this.state.minutes,
			seconds = this.state.seconds,
			milliseconds = this.state.milliseconds

	    	this.milliseconds += 1;
	    if (this.milliseconds >= 100) {
	        this.seconds += 1;
	        this.milliseconds = 0;
	    }
	    if (this.seconds >= 60) {
	        this.minutes += 1;
	        this.seconds = 0;
	    }
	    this.setState({
	    	minutes: minutes,
	    	seconds: seconds,
	    	milliseconds: milliseconds
	    });

	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
		console.log('workstop');
	}

	clear() {
		this.reset();
		this.print();
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
	    		<div className="stopwatch">{this.format(this.times)}</div>
	    		<ul className="results"></ul>
    		</div>
    	)	
		
	}

}

ReactDOM.render(
	<Stopwatch />,
	document.getElementById('app')
);