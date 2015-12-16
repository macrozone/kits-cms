Router.route("/", {name: "home"});

if(Meteor.isClient) {
  Template.home.onCreated(function() {

    this.autorun(()=> {
      this.subscribe('page', "home");
    });
  });

  Template.home.helpers({
    page() {
      return orion.pages.collection.findOne({ url: "home"});
    },
    layout() {
      var page = orion.pages.collection.findOne({ url: "home"});
      var template = orion.pages.templates[page.template];
      return template.layout;
    },
    template() {
      var page = orion.pages.collection.findOne({ url: "home"});
      return page.template;
    }
  });
}
