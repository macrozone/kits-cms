
SchoolClasses = new orion.collection("SchoolClasses", {
	singularName: "Class",
	pluralName: "Classes",
	tabular: {
		columns: [
			{data: "name", title: "Name"},

		]
	}
});

SchoolClasses.attachSchema(new SimpleSchema({
	name: {
		type: String
	}
}));

People = new orion.collection("People", {
	singularName: "Person",
	pluralName: "People",
	tabular: {
		columns: [
		{data: "firstname", title: "Firstname"},

		{data: "lastname", title: "Lastname"},

		{data: "class", title: "Class"},

		{data: "job", title: "Job"},

		
		]
	}
});

People.attachSchema(new SimpleSchema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	schoolClasses: orion.attribute('hasMany', {
		label: 'Class'
	}, {
		collection: SchoolClasses,
		titleField: 'name',
		publicationName: 'PeopleSchoolClasses',
	}),
	images: orion.attribute("images")
}));