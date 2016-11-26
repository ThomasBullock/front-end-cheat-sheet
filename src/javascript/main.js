// $(document).ready(function(){

	// console.log( "Application is running" );


	// Data/Model Object
	var data = {
		init: function() {
			$.getJSON('data/cheatsheet.json', function(response){
				console.log(response)
				// data.cheats = response;
				// initialize();
				data.git = response.git;
				data.terminal = response.terminal;
				data.bourbon = response.bourbon;
				data.gulp = response.gulp;				
			});
		}
	}



	function Group(info) {
		this.name = Object.keys(info);
		this.entries = ko.observableArray();
		for(var i = 0; i < info[this.name].length; i++) {
			// console.log(info[this.name][i]);
			this.entries.push(new Entry(info[this.name][i]));
		}
	};


	function Entry(details) { /////////////!!!!!!
		var self = this;
		// console.log(info);
		self.command = details.command;
		self.description = details.description;
		this.tags = ko.observable(details.tag);

	}


	var AppViewModel = function() {

		var self = this;

		self.myList = ko.observable();
		self.myListDisplay = ko.computed(function(){
			return self.myList() + " Cheat Sheet";
		})
		self.cheatList = ko.observableArray();
		self.filter = ko.observable();

    self.filterEntries = function (group) {
        console.log(group)
        // console.log(elem)
        var filter = self.filter();
        if(!filter) {
            return group.entries();
        } else {
            console.log(group)
            return group.entries().filter(function(entry) {
                console.log(entry);
                var matching = -1;
                ko.utils.arrayForEach(entry.tags(), function(tag) {
                    var val = tag;
                    matching+= val.toLowerCase().indexOf(filter.toLowerCase())+1;
                    console.log(tag + " " + matching);
                });
                return matching>=0;
            });   
        }
    };


		$('.nav-btn').on('click', function(){
			self.filter(null)
			var select = this.lastChild.innerText;
			self.myList(select);		
			// console.log(select);	
			// console.log(self[JSON.stringify(select)]);
			self.buildList(select.toLowerCase());
		})

		self.copy = new Clipboard('.command', {
			    text: function(trigger) {
			    	 // console.log(trigger);
			    	 // console.log(this);
       				 return trigger.innerText;
    			}
		});

		// Temp console 
		self.copy.on('success', function(e) {
	    console.info('Text:', e.text);
	    e.clearSelection();
	});

		self.buildList = function(name) {

			self.cheatList.splice(0, self.cheatList().length);
			for (var i = 0; i < data[name].length; i++) {
				self.cheatList.push(new Group(data[name][i]))
			}
			console.log(self.cheatList());
		}
	}


data.init();

// put viewModel into var my so its accessable from the console
// function view() {

	console.log(data.cheats);
	var app = { viewModel: new AppViewModel() };

	// Activates knockout.js
	ko.applyBindings(app.viewModel);

// }

// }) 


