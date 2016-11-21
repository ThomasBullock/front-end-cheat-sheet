// $(document).ready(function(){

	// console.log( "Application is running" );


	// Data/Model Object
	var data = {
		self: this,
		init: function() {
			$.getJSON('data/cheatsheet.json', function(response){
				// console.log(response)
				data.git = response.git;
				data.terminal = response.terminal;
				data.bourbon = response.bourbon;
				data.gulp = response.gulp;				
			});
		}
	}



	function Group(info) {
		// console.log(info)
		this.name = Object.keys(info);
		// console.log(this.name);
		this.entries = [];
		for(var i = 0; i < info[this.name].length; i++) {
			// console.log(info[this.name][i]);

			this.entries.push(new Entry(info[this.name][i]));
		}
		// console.log(this.name);
		// console.log(this.entries);
	};

	// Group.prototype.render = function() {
	// 	console.log("render has been called");
	// 	this.groupDiv = $('<div></div>').addClass('cheat-group');
	// 	this.heading = $('<h2 data-bind="text: ' + this.name + '"></h2>');
	// 	this.groupDiv.append(this.heading);
	// 	return this.groupDiv;	
	// // 	// 	text: "this.name";
	// // 	// }).addClass('group-heading');
	// };

	function Entry(info) { /////////////!!!!!!
		// console.log(info);
		this.command = info.command;
		this.description = info.description;
		this.tag = info.tag;
	}

	Entry.prototype.render = function() {

	};

	var AppViewModel = function() {
		var self = this;

		self.myList = ko.observable();
		self.myListDisplay = ko.computed(function(){
			return self.myList() + " Cheat Sheet";
		})
		self.cheatList = ko.observableArray();

		$('.nav-btn').on('click', function(){
			var select = this.lastChild.innerText;
			self.myList(select);		
			// console.log(select);	
			// console.log(self[JSON.stringify(select)]);
			self.buildList(select.toLowerCase());
		})

		self.copy = new Clipboard('.command', {
			    text: function(trigger) {
			    	 console.log(trigger);
			    	 console.log(this);
       				 return trigger.innerText;
    			}
		});

		self.buildList = function(name) {

			self.cheatList.splice(0, self.cheatList().length);
			for (var i = 0; i < data[name].length; i++) {
				self.cheatList.push(new Group(data[name][i]))
			}
			// self.render();			
		}

	// 	self.render = function(entry) {
	// 		for(var i = 0; i < self.cheatList().length; i++) {
	// 			console.log(self.cheatList()[i].render);
	// 			$('.cheats').append( self.cheatList()[i].render() );
	// 		}
	// }


	}


data.init();

// put viewModel into var my so its accessable from the console
var app = { viewModel: new AppViewModel() };

// Activates knockout.js
ko.applyBindings(app.viewModel);



// }) 


