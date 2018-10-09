$(function(){
    //Using computed observables
    //ko.applyBindings(AppViewModel, document.getElementById("t1"));
    ko.applyBindings(AppViewModel2, document.getElementById("t1"));
    ko.applyBindings(viewModel, document.getElementById("t2"));
    vm3(document.getElementById("t3"));
});

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
