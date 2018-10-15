$(function(){
    //Using computed observables
    //ko.applyBindings(AppViewModel, document.getElementById("t1"));
    ko.applyBindings(AppViewModel2, document.getElementById("t1"));
    ko.applyBindings(viewModel, document.getElementById("t2"));
    vm3(document.getElementById("t3"));
    ko.applyBindings(vm4, document.getElementById("t4"));
    ko.applyBindings(vm5, document.getElementById("t5"));
    ko.applyBindings(new vm6(), document.getElementById("t6"));
    ko.applyBindings(vm7, document.getElementById("t7"));
    ko.applyBindings(vm8, document.getElementById("t8"));
    ko.applyBindings(vm9, document.getElementById("t9"));
    ko.applyBindings(new vm10(), document.getElementById("t10"));
});

function vm10() {
    this.buyer = { name: 'Franklin', credits: 250 };
    this.seller = { name: 'Mario', credits: 5800 };
}

// Constructor for an object with two properties
var Country = function(name, population) {
    this.countryName = name;
    this.countryPopulation = population;
};

var vm9 = {
    availableCountries : ko.observableArray([
        new Country("UK", 65000000),
        new Country("USA", 320000000),
        new Country("Sweden", 29000000)
    ]),
    selectedCountry : ko.observable() // Nothing selected by default
};

var vm8 = {
    availableCountries: ko.observableArray(['France', 'Germany', 'Spain', 'France', 'Germany', 'Spain'])
};

var vm7 = {
    wantsSpam: ko.observable(true),
    spamFlavors: ko.observableArray(["cherry","almond"]) ,// Initially checks the Cherry and Almond checkboxes
    showselected: function(){
        var vl = this.spamFlavors();
        console.log(vl);
        alert(vl);
        alert(typeof(vl));
    },
};

function vm6() {
    var self = this;
    self.places = ko.observableArray(['London', 'Paris', 'Tokyo']);

    // The current item will be passed as the first parameter, so we know which place to remove
    self.removePlace = function(place) {
        self.places.remove(place)
    }
}

function vm5() {
    var self = this;
    self.twitterName = ko.observable('@example');
    self.resultData = ko.observable(); // No initial value
 
    self.getTweets = function() {
        var name = self.twitterName(),
            simulatedResults = [
                { text: name + ' What a nice day.' },
                { text: name + ' Building some cool apps.' },
                { text: name + ' Just saw a famous celebrity eating lard. Yum.' }
            ];
 
        self.resultData({ retrievalDate: new Date(), topTweets: simulatedResults });
    }
 
    self.clearResults = function() {
        self.resultData(undefined);
    }
}

var vm4 = {
    planets: [
        { name: 'Mercury', capital: undefined }, 
        { name: 'Earth', capital: { cityName: 'Barnsley' } }        
    ]
};

var vm3 = function(selecter){
    ko.applyBindings({
        myItems: ko.observableArray([ 'A', 'B', 'C' ]),
        yellowFadeIn: function(element, index, data) {
            $(element).filter("li")
                      .animate({ backgroundColor: 'yellow' }, 2000)
                      .animate({ backgroundColor: 'white' }, 2000);
        },
        addItem: function() { this.myItems.push('New item'); }
    }, selecter);
}

var viewModel = {
    details: ko.observable() // Initially blank
};
viewModel.details("<em>For further details, view the report <a href='#'>here</a>.</em>");

function AppViewModel() {
    this.firstName = ko.observable('Bob');
    this.lastName = ko.observable('Smith');

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
}


function AppViewModel2() {
    var self = this;
 
    self.firstName = ko.observable('Bob').extend({ required: "Please enter a first name", logChange: "first name" });
    self.lastName = ko.observable('Smith');

    self.fullName = ko.computed(function() {
        return self.firstName() + " " + self.lastName();
    }).extend({ rateLimit: 5000 });
}


ko.extenders.required = function(target, overrideMessage) {
    //add some sub-observables to our observable
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();
 
    //define a function to do validation
    function validate(newValue) {
       target.hasError(newValue ? false : true);
       target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
    }
 
    //initial validation
    validate(target());
 
    //validate whenever the value changes
    target.subscribe(validate);
 
    //return the original observable
    return target;
};

ko.extenders.logChange = function(target, option) {
    target.subscribe(function(newValue) {
       console.log(option + ": " + newValue);
    });
    return target; 
};
