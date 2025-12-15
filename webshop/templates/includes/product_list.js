// Product Search page helper for Webshop.

window.get_product_list = function () {
	$(".more-btn .btn").click(function () {
		window.get_product_list();
	});

	if (window.start === undefined) {
		throw "product list not initialized (no start)";
	}

	$.ajax({
		method: "GET",
		url: "/",
		data: {
			cmd: "webshop.templates.pages.product_search.get_product_list",
			start: window.start,
			limit: 12,
			search: window.search,
		},
		dataType: "json",
		success: function (data) {
			window.render_product_list((data && data.message) || []);
		},
	});
};

window.render_product_list = function (data) {
	let container = $("#search-list");

	if (data && data.length) {
		$.each(data, function (i, html) {
			$(html).appendTo(container);
		});
	}

	const got = (data && data.length) || 0;

	// Only show "No products found" when the first page is empty.
	if (got === 0) {
		let message = __("No products found.");
		if (window.start && window.start > 0) message = __("Nothing more to show.");
		$(".more-btn").replaceWith(`<div class="text-muted">${message}</div>`);
	} else if (got < 12) {
		// We have results, but fewer than a full page: no need to show "More...".
		$(".more-btn").toggle(false);
	} else {
		$(".more-btn").toggle(true);
	}

	window.start += got;
};
