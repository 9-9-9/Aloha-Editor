(function (aloha) {
	'use strict';

	var Boundaries = aloha.boundaries;
	var BoundaryMarkers = aloha.boundarymarkers;
	var Events = aloha.events;

	var editor = document.getElementById('aloha_instance');
	aloha(editor);

    module('caret');

    function t(html, top, left) {
        test(html, function() {
            editor.innerHTML = html;
            var boundaries = BoundaryMarkers.extract(editor);
			Boundaries.select(boundaries[0], boundaries[1]);
			Events.dispatch(document, editor, 'keypress');

			var tp = document.querySelector('.aloha-caret');
			equal(tp.offsetTop - editor.offsetTop, top, 'top');
			equal(tp.offsetLeft - editor.offsetLeft, left, 'left');
        });
    }

	t('<p>[]one</p>', 9, 0);
	t('<p>one[]      </p>', 9, 18);
	t('<p>one     []   </p>', 9, 18);

	t('<p>{}<br/></p>', 9, 0);
	t('<p style="padding: 10px;">[]one</p>', 19, 10);
	t('<p style="padding: 10px;">{}<br/></p>', 19, 10);
	t('<p style="border:20px solid red">{}<br/></p>', 29, 20);

	t('<p>multiline []paragraph test</p>', 19, 0);

	t('<p>4 brs next<br/><br/>{}<br/><br/>two brs next<br><br>last line</p>', 29, 0);
	t('<ul><li>foo</li><li><b>{}<i></i></b></li></ul> bar', 19, 40);

	t('<p>one<br>{}<br></p>', 19, 0);
	t('<p>one<b>two<br>{}<br></b></p>', 19, 0);

	// Shift + Enter
	t('<p>one<br><br>{}</p>', 19, 0);
	t('<p>one<b>two<br><br>{}</b></p>', 19, 0);
}(window.aloha));

