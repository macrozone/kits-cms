orion.dictionary.addDefinition('logo', 'site', orion.attribute("image", {label: "Logo"}));



if(Meteor.isClient)
{
	Meteor.startup(function(){
		Meteor.subscribe("pages");
	})


	orion.links.add({
		identifier: "test",
		title: "Test page",
		iconClass: "fa fa-bluetooth",
		index: 100
	});

	orion.links.add({
		identifier: "test2",
		title: "Test 2",
		iconClass: "fa fa-reddit-alien",
		parent: "test",
		index: 200
	});
	orion.links.add({
		identifier: "test3",
		title: "Test 3",
		iconClass: "fa fa-reddit-alien",
		parent: "test",
		index: 300
	});
	orion.links.add({
		identifier: "test4",
		title: "Test 4",
		iconClass: "fa fa-reddit-alien",
		parent: "test",
		index: 400
	});
}

