# Social Preview
The **js-social-preview** is a small javascript tool for dynamically creating previews for sharing on social networks.

## How to use it ?
First, you need to put both files from this project in your HTML file, preferebly in the ``<head>`` tag:
```html
<html>
<head>
...
<link rel="stylesheet" href="https://raw.githubusercontent.com/kktsvetkov/js-social-preview/master/social-preview.css" />
<script type="application/javascript" src="https://raw.githubusercontent.com/kktsvetkov/js-social-preview/master/social-preview.js"></script>
</head>
```

To create a preview, pick an element on your page and inject the ``social_preview.small()`` generated HTML into it:
```html
<script>
document.getElementById('social_preview').innerHTML = social_preview.small();
</script>
```
This will create a "small" social preview with the metadata from the page it is on. 

Use ``social_preview.big()`` to create a "big" preview (here is an example with jQuery):
```html
<script>
jQuery('#social_preview').html( social_preview.big() );
</script>
```
These two examples above read the metadata from the current page the tool is being loaded from. You can also feed the metadata you want to create a social preview. You must pass it as an argument, with these five elements: "title", "description", "site", "url" and "img". Here's an example: 
```html
<script>
document.getElementById('social_preview').innerHTML = social_preview.small({
	title: 'Kaloyan K. Tsvetkov',
	description: 'self-proclaimed retired software engineer',
	site: 'kaloyan.info',
	url: 'http://kaloyan.info/',
	img: 'http://kaloyan.info/images/me.jpg'
});
</script>
```

## How it works ?
What **js-social-preview** does is to create very basic and simple HTML markup and style it visualy to look like the previews you get when sharing links on social sites. To create the HTML the tool uses metadata, which can either be collected from the current page or fed as an argument.

### social_preview.source(from)
Use this to extract metadata from the current page. With the ``from`` argument you can point to what type of metadata to use:
* "fb" - use Open-Graph metadata, prefered by Facebook 
* "tw" - use Twitter Card metadata
There are slight differences in the "fb" and "tw" metadata, like using site domain or site name, and that's why you can choose which one to use.

### social_preview.html(o, size)
The HTML for the previews is created by ``social_preview.html()``, and it takes two arguments: the collected metadata to use, and the size of the preview. There are two built-in sizes for the social previews, "big" and "small". For each of the sizes there is a corresponding set of CSS classes that format the data accordingly.

