// $(document).ready(function(){

	// console.log( "Application is running" );


	// Data/Model Object
	var data = {
		links: {"Git": "https://git-scm.com/", "jQuery": "http://api.jquery.com/", "Terminal": "https://developer.apple.com/library/content/documentation/OpenSource/Conceptual/ShellScripting/CommandLInePrimer/CommandLine.html", "Gulp": "http://gulpjs.com/", "Bourbon": "http://bourbon.io/", "Neat": "http://neat.bourbon.io/"},
		init: function() {
			$.getJSON('data/cheatsheet.json', function(response){
				console.log(response)
				// data.cheats = response;
				// initialize();
				data.Git = response.Git;
				data.Terminal = response.Terminal;
				data.Bourbon = response.Bourbon;
				data.Gulp = response.Gulp;
				data.jQuery = response.jQuery;
				data.Neat = response.Neat;

				app.viewModel.buildList("Git");				
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

		self.myList = ko.observable("Git");
		self.myListDisplay = ko.computed(function(){
			return self.myList() + " Cheat Sheet";
		})
		self.link = ko.computed(function(){
			console.log(data.links);
			return data.links[self.myList()];
		})
		self.icon = ko.computed(function(){
			return "/img/" + self.myList().toLowerCase() + "_logo.png"
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
			self.buildList(select);
		})

		self.copy = new Clipboard('.command', {
			    text: function(trigger) {
			    	 // console.log(trigger);
			    	 // console.log(this);

			    $('.message').fadeIn().delay(1000).fadeOut();
       				 return trigger.innerText;
    			}
		});

		// Temp console 
		self.copy.on('success', function(e) {
	    console.info('Text:', e.text);
	    e.clearSelection();
		});

		if($('.message').css('display') !== 'none') {
			console.log('message visible')
		}

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


