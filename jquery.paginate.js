(function($){

$.fn.extend({
        
	paginate: function(currPage, numPages, callback, settings) {
	
		settings = $.extend({
			numEntries:	2,
			entryClass:	"paginationEntry",
			currentClass: "paginationCurrent",
			firstClass:	"paginationFirst",
			firstText: "<<",
			showFirst: true,
			prevClass: "paginationPrev",
			prevText: "<",
			showPrev: true,
			nextClass: "paginationNext",
			nextText: ">",
			showNext: true,
			lastClass: "paginationLast",
			lastText: ">>",
			showLast: true
		}, settings);
		
		var hasPrev = currPage > 1;
		var hasNext = currPage < numPages;
		
		var html = "<ul>";
		
		function getPaginationLinkEntry(page, text) {
			page = Math.max(1, page);
			page = Math.min(numPages, page);
			if(!text)
				text = page;
			var entryClass = settings.entryClass;
			if(page == currPage)
				entryClass += " " + settings.currentClass;
			var result = '<li class="' + entryClass + '">';
			if(page != currPage)
				result += '<a href="?p=' + page + '">' + text + '</a>';
			else
				result += text;
			result += '</li>';
			return result;
		}
		
		var start = Math.round(Math.max(1, currPage - settings.numEntries/2));
		var end = Math.min(numPages, start + settings.numEntries);
		
		// make sure we are showing as many entries as possible within numEntries
		var extra = settings.numEntries - end + start;
		start = Math.max(1, start - extra);
		end = Math.min(numPages, end + extra);
		
		if(settings.showFirst && start > 1)
			html += getPaginationLinkEntry(1, settings.firstText);
		
		if(settings.showPrev && hasPrev)
			html += getPaginationLinkEntry(currPage - 1, settings.prevText);
		
		for(i = start; i <= end; i++)  
			html += getPaginationLinkEntry(i);
		
		if(settings.showNext && hasNext)
			html += getPaginationLinkEntry(currPage + 1, settings.nextText);
		
		if(settings.showLast && end < numPages)
			html += getPaginationLinkEntry(numPages, settings.lastText);
		
		html += "</ul>";
		
		$(this).html(html);
		
		$(this).find('.' + settings.entryClass + ' a').click(function(e) {
			e.preventDefault();
			var href = $(this).attr('href');
			var newPage = parseInt(href.substring(3));
			callback(newPage);
		});
		
		return $(this);
	}
});

})(jQuery);
