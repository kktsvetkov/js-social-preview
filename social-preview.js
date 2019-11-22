/**
* Social Preview
*
* This library is meant to dynamically creating previews for social sharing.
*
* @link https://github.com/kktsvetkov/js-social-preview
* @author Kaloyan K. Tsvetkov <kaloyan@kaloyan.info>
* @license MIT https://opensource.org/licenses/MIT
*/

social_preview = new function()
{
	// shortcut for finding the canonical URL
	//
	function get_canonical_url()
	{
		var links = document.getElementsByTagName('links');
		for (var i = 0; i < links.length; i++)
		{
			if ('canonical' == links[i].getAttribute('rel'))
			{
				return links[i].getAttribute('href');
			}
		}

		return '';
	}

	// shortcut for checking whether to use external source data, or
	// to load it from the current page using social_preview.source()
	//
	function is_empty_source(o)
	{
		if ('object' != typeof o)
		{
			return true;
		}

		for (var i in o )
		{
			return false;
		}

		return true;
	}

	var metas = document.getElementsByTagName('meta');

	/**
	* Fetch the data for the social preview from this page
	*
	* @param {string} "from" either empty string, "fb" for reading Open-Graph 
	*	metadata (used by Facebook), or "tw" for reading Twitter Card metadata
	* @return {object} object with "title", "description", "url", "site", "img"
	*/
	this.source = function(from)
	{
		o = {
			"title": "",
			"description": "",
			"url": "",
			"site": "",
			"img": ""
		}

		for (var i = 0; i < metas.length; i++)
		{
			value = metas[i].getAttribute('content');
			prop = metas[i].getAttribute('property')
				|| metas[i].getAttribute('name');

			if ('fb' == from)
			{
				switch( prop )
				{
					case 'og:title':
						o.title = value;
						break;

					case 'og:url':
						o.url = value;
						break;

					case 'og:image':
						o.img = value;
						break;

					case 'og:site_name':
						o.site = value;
						break;

					case 'og:description':
						o.description = value;
						break;
				}
			}

			if ('tw' == from)
			{
				switch( prop )
				{
					case 'twitter:title':
						o.title = value;
						break;

					case 'twitter:url':
					case 'og:url':
						o.url = o.url || value;
						break;

					case 'twitter:image':
					case 'og:image':
						o.img = o.img || value;
						break;

					case 'twitter:domain':
						o.site = value;
						break;

					case 'twitter:description':
					case 'og:description':
						o.description = o.description || value;
						break;
				}
			}

			switch( prop )
			{
				case 'description':
					o.description = o.description || value;
					break;
			}
		}

		// get the document title
		//
		if (!o.title)
		{
			o.title = document.title;
		}

		// get the url from the canonical url
		//
		if (!o.url)
		{
			o.url = get_canonical_url();
		}

		// get the domain name from the url
		//
		if (!o.site && o.url)
		{
			o.site = o.url.match(/(?:https?:)?(?:\/\/)?([^\/#\?]+)/i)[1].toLowerCase();
		}

		return o;
	}

	/**
	* Return the HTML for the social preview
	*
	* @param {object} "o"
	* @param {string} "size" either empty string, "small" or "big"
	* @return {string}
	*/
	this.html = function(o, size)
	{
		if ('object' != typeof o)
		{
			o = {}
		}

		o.title = o.title || '';
		o.description = o.description || '';
		o.site = o.site || '';
		o.url = o.url || '';
		o.img = o.img || '';

		return '<div class="social-preview-card social-preview-' + size + '">'
				+ '<img style="background-image: url(' + o.img + ');" />'
			+ '<h1>' + o.title + '</h1>'
			+ '<p>' + o.description + '</p>'
			+ '<a href="' + o.url + '">'
				+ o.site
				+ '</a>'
			+ '</div>';
	}

	/**
	* Shortcut for rendering a small social preview
	*
	* @param {object} "o"
	* @param {string} "from" either empty string, "fb" or "tw"
	* @return {string}
	*/
	this.small = function(o, from)
	{
		if (is_empty_source(o))
		{
			o = this.source(from);
		}

		return this.html(o, 'small);
	}

	/**
	* Shortcut for rendering a big social preview
	*
	* @param {object} "o"
	* @param {string} "from" either empty string, "fb" or "tw"
	* @return {string}
	*/
	this.tw = function(o, from)
	{
		if (is_empty_source(o))
		{
			o = this.source(from);
		}

		return this.html(o, 'big');
	}
}
