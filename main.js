orion.dictionary.addDefinition('logo', 'site', orion.attribute("image", {label: "Logo"}));



if(Meteor.isClient)
{
	Meteor.startup(function(){
		Meteor.subscribe("pages");
	})
}
