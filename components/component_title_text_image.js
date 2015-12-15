orion.components.registerComponent("title_text_image", {
    title: "Component with title, text and an image",
    templateFrontend: "component_title_text_image",
    schema: new SimpleSchema({
        title: {
            type: String,
            label: "Title"
        },
        text: orion.attribute('froala', {
            label: 'Text'
        }),
        image: orion.attribute("image", {label: "Image"})
    })
});