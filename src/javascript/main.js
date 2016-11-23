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
		this.entries = ko.observableArray();
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
		var self = this;
		// console.log(info);
		self.command = info.command;
		self.description = info.description;
		self.hide = ko.computed(function(){
			var filter = app.viewModel.filter();
			if(!filter) {
				return true;
			}
		});
		// this.tag = ko.observable(info.tag);
		self.tag = info.tag;		
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
		self.filter = ko.observable();

		// self.visible = function(){
		// 		var filter = self.filter();
		// 		if(!filter) {
		// 			return true;
		// 		}	else {
		// 			return false;
		// 			// self.tagSearch(filter, this.tag)
		// 		}		
		// }

		self.tagSearch = function(searchValue, tagArray) {
			var match = -1;
			for(var i = 0; i < tagArray.length; i++) {
				if(tagArray[i].toLowerCase() === searchValue.toLowerCase()) {
					console.log("match!");
					match+=1;
				}	
			}
			return (match >= 0) ? true:false;
		}


		self.filtered = ko.computed(function(){
			console.log(this)
			var filter = self.filter();
			if(!filter) {
				return true;
			} else {
				return false;
			}
		})


		self.filteredItems = ko.computed(function(){
			// console.log(self.cheatList());
			var filter = self.filter();
			console.log(filter);
				if(!filter) {
					return self.cheatList();
				} else {
					self.cheatList().forEach(function(group) {
						return ko.utils.arrayForEach(group.entries, function (entry) {
							console.log(entry.tag);
							return ko.utils.arrayFilter(entry.tag, function (tag) {
								if(tag === filter) {
									console.log("tag found!");
									return true;
								} else {
									return false;
								}
							console.log(self.cheatList())								
							})
						})

						return self.cheatList();
					})
					//this works on group names
					// return ko.utils.arrayFilter(self.cheatList(), function (group) {
					// 	console.log(group.name[0])	
					// 	if (group.name[0] === filter) {
					// 		return true;
					// 	} else {
					// 		return false;
					// 	}
					// });
						/// end works



						// return ko.utils.arrayForEach(group.entries(), function(entry) {
						// // group.entries.forEach(function(entry){	
						// 	// console.log(entry.tag);
						// 	if(self.tagSearch(filter, entry.tag())) {
						// 		console.log("tag was found!")
						// 		return true;
						// 	} else {
						// 		return false;
						// 	}
						// });




				}
		});




		$('.nav-btn').on('click', function(){
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


