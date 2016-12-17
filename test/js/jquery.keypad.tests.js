var PROP_NAME = 'keypad';

function init(id, options) {
	$.keypad.setDefaults($.keypad.regionalOptions['']);
	return $(id).keypad('destroy').keypad($.extend({showAnim: ''}, options || {}));
}

$(function() {
	test('Set defaults', function() {
		expect(2);
		equal($.keypad.defaultOptions.prompt, '', 'Initial prompt');
		$.keypad.setDefaults({prompt: 'Enter here'});
		equal($.keypad.defaultOptions.prompt, 'Enter here', 'Changed prompt');
		$.keypad.setDefaults({prompt: ''});
	});

	test('Destroy', function() {
		expect(33);
		var kpd = init('#kpd');
		ok(kpd.hasClass('is-keypad'), 'Default - marker class set');
		ok(kpd.data(PROP_NAME), 'Default - instance present');
		ok(kpd.next().length == 0, 'Default - button absent');
		kpd.keypad('destroy');
		kpd = $('#kpd');
		ok(!kpd.hasClass('is-keypad'), 'Default - marker class cleared');
		ok(!kpd.data(PROP_NAME), 'Default - instance absent');
		ok(kpd.next().length == 0, 'Default - button absent');
		// With button
		kpd = init('#kpd', {showOn: 'both'});
		ok(kpd.hasClass('is-keypad'), 'Button - marker class set');
		ok(kpd.data(PROP_NAME), 'Button - instance present');
		ok(kpd.next().text() == '...', 'Button - button added');
		kpd.keypad('destroy');
		kpd = $('#kpd');
		ok(!kpd.hasClass('is-keypad'), 'Button - marker class cleared');
		ok(!kpd.data(PROP_NAME), 'Button - instance absent');
		ok(kpd.next().length == 0, 'Button - button removed');
		// With append text
		kpd = init('#kpd', {appendText: 'Testing'});
		ok(kpd.hasClass('is-keypad'), 'Append - marker class set');
		ok(kpd.data(PROP_NAME), 'Append - instance present');
		ok(kpd.next().text() == 'Testing', 'Append - append text added');
		kpd.keypad('destroy');
		kpd = $('#kpd');
		ok(!kpd.hasClass('is-keypad'), 'Append - marker class cleared');
		ok(!kpd.data(PROP_NAME), 'Append - instance absent');
		ok(kpd.next().length == 0, 'Append - append text removed');
		// With both
		kpd = init('#kpd', {showOn: 'both', buttonImageOnly: true,
			buttonImage: 'img/calendar.gif', appendText: 'Testing'});
		ok(kpd.hasClass('is-keypad'), 'Both - marker class set');
		ok(kpd.data(PROP_NAME), 'Both - instance present');
		ok(kpd.next()[0].nodeName.toLowerCase() == 'img', 'Both - button added');
		ok(kpd.next().next().text() == 'Testing', 'Both - append text added');
		kpd.keypad('destroy');
		kpd = $('#kpd');
		ok(!kpd.hasClass('is-keypad'), 'Both - marker class cleared');
		ok(!kpd.data(PROP_NAME), 'Both - instance absent');
		ok(kpd.next().length == 0, 'Both - button and append text absent');
		// Inline
		var inl = init('#inl');
		ok(inl.hasClass('is-keypad'), 'Inline - marker class set');
		ok($.data(inl[0], PROP_NAME), 'Inline - instance present');
		ok(inl.next().length == 0, 'Inline - button absent');
		ok(inl.html() != '', 'Inline - content present');
		inl.keypad('destroy');
		inl = $('#inl');
		ok(!inl.hasClass('is-keypad'), 'Inline - marker class cleared');
		ok(!$.data(inl[0], PROP_NAME), 'Inline - instance absent');
		ok(inl.next().length == 0, 'Inline - button absent');
		ok(inl.html() == '', 'Inline - content absent');
	});

	test('Option', function() {
		expect(9);
		var kpd = init('#kpd');
		var defaultLayout = $.keypad.defaultOptions.layout;
		var pad = $('.keypad-popup');
		kpd.keypad('show');
		equal($('button', pad).length, 13, 'Check buttons - default');
		deepEqual(kpd.keypad('option', 'layout'), defaultLayout, 'Get layout - default');
		kpd.keypad('hide').keypad('option', {layout: $.keypad.qwertyAlphabetic}).keypad('show');
		equal($('button', pad).length, 26, 'Check buttons - alphabetic');
		deepEqual(kpd.keypad('option', 'layout'), $.keypad.qwertyAlphabetic, 'Get layout - alphabetic');
		kpd.keypad('hide').keypad('option', {layout: $.keypad.qwertyLayout}).keypad('show');
		equal($('button', pad).length, 75, 'Check buttons - full');
		deepEqual(kpd.keypad('option', 'layout'), $.keypad.qwertyLayout, 'Get layout - full');
		kpd.keypad('hide').keypad('option', {layout: defaultLayout}).keypad('show');
		equal($('button', pad).length, 13, 'Check buttons - default');
		deepEqual(kpd.keypad('option', 'layout'), defaultLayout, 'Get layout - default');
		deepEqual(kpd.keypad('option'), {showOn: 'focus', buttonImage: '', buttonImageOnly: false,
			showAnim: '', showOptions: null, duration: 'normal', appendText: '',
			useThemeRoller: false, keypadClass: '', prompt: '', layout: defaultLayout,
			separator: '', target: null, keypadOnly: true, randomiseAlphabetic: false,
			randomiseNumeric: false, randomiseOther: false, randomiseAll: false,
			beforeShow: null, onKeypress: null, onClose: null,
			buttonText: '...', buttonStatus: 'Open the keypad', closeText: 'Close',
			closeStatus: 'Close the keypad', clearText: 'Clear', clearStatus: 'Erase all the text',
			backText: 'Back', backStatus: 'Erase the previous character', spacebarText: '&#160;',
			spacebarStatus: 'Space', enterText: 'Enter', enterStatus: 'Carriage return',
			tabText: '→', tabStatus: 'Horizontal tab', shiftText: 'Shift',
			shiftStatus: 'Toggle upper/lower case characters', alphabeticLayout: $.keypad.qwertyAlphabetic,
			fullLayout: $.keypad.qwertyLayout, isAlphabetic: $.keypad.isAlphabetic, isNumeric: $.keypad.isNumeric,
			toUpper: $.keypad.toUpper, isRTL: false }, 'All options');
	});

	test('Invocation', function() {
		expect(31);
		var kpd = init('#kpd');
		var pad = $('.keypad-popup');
		var body = $('body');
		// On focus
		var button = kpd.siblings('button');
		ok(button.length == 0, 'Focus - button absent');
		var image = kpd.siblings('img');
		ok(image.length == 0, 'Focus - image absent');
		kpd.focus();
		ok(pad.is(':visible'), 'Focus - rendered on focus');
		$('.keypad-close', pad).click();
		ok(!pad.is(':visible'), 'Focus - hidden on exit');
		kpd.focus();
		ok(pad.is(':visible'), 'Focus - rendered on focus');
		body.simulate('mousedown', {});
		ok(!pad.is(':visible'), 'Focus - hidden on external click');
		kpd.keypad('hide');
		// On button
		kpd = init('#kpd', {showOn: 'button', buttonText: 'Popup'});
		ok(!pad.is(':visible'), 'Button - initially hidden');
			button = kpd.siblings('button');
		image = kpd.siblings('img');
		ok(button.length == 1, 'Button - button present');
		ok(image.length == 0, 'Button - image absent');
		equal(button.text(), 'Popup', 'Button - button text');
		kpd.focus();
		ok(!pad.is(':visible'), 'Button - not rendered on focus');
		button.click();
		ok(pad.is(':visible'), 'Button - rendered on button click');
		button.click();
		ok(!pad.is(':visible'), 'Button - hidden on second button click');
		kpd.keypad('hide');
		// On image button
		kpd = init('#kpd', {showOn: 'button', buttonImageOnly: true,
			buttonImage: 'img/calendar.gif', buttonText: 'Cal'});
		ok(!pad.is(':visible'), 'Image button - initially hidden');
		button = kpd.siblings('button');
		ok(button.length == 0, 'Image button - button absent');
		image = kpd.siblings('img');
		ok(image.length == 1, 'Image button - image present');
		equal(image.attr('src'), 'img/calendar.gif', 'Image button - image source');
		equal(image.attr('title'), 'Open the keypad', 'Image button - image text');
		kpd.focus();
		ok(!pad.is(':visible'), 'Image button - not rendered on focus');
		image.click();
		ok(pad.is(':visible'), 'Image button - rendered on image click');
		image.click();
		ok(!pad.is(':visible'), 'Image button - hidden on second image click');
		kpd.keypad('hide');
		// On both
		kpd = init('#kpd', {showOn: 'both', buttonImage: 'img/calendar.gif'});
		ok(!pad.is(':visible'), 'Both - initially hidden');
		button = kpd.siblings('button');
		ok(button.length == 1, 'Both - button present');
		image = kpd.siblings('img');
		ok(image.length == 0, 'Both - image absent');
		image = button.children('img');
		ok(image.length == 1, 'Both - button image present');
		kpd.focus();
		ok(pad.is(':visible'), 'Both - rendered on focus');
		body.simulate('mousedown', {});
		ok(!pad.is(':visible'), 'Both - hidden on external click');
		button.click();
		ok(pad.is(':visible'), 'Both - rendered on button click');
		button.click();
		ok(!pad.is(':visible'), 'Both - hidden on second button click');
		kpd.keypad('hide');
		// Readonly
		kpd = init('#kpd');
		ok(kpd.prop('readonly'), 'Keypad only - readonly');
		kpd = init('#kpd', {keypadOnly: false});
		ok(!kpd.prop('readonly'), 'Keypad only - not readonly');
	});

	test('Structure', function() {
		expect(28);
		var pad = $('.keypad-popup');
		var kpd = init('#kpd');
		kpd.focus();
		ok(pad.is(':visible'), 'Structure - keypad visible');
		ok(!pad.hasClass('keypad-rtl'), 'Structure - not right-to-left');
		ok(!pad.is('.ui-widget,.ui-widget-content'), 'Structure - not UI widget');
		equal(pad.children().length, 4, 'Structure - child count');
		var row = pad.children(':first');
		ok(row.is('div.keypad-row'), 'Structure - row division');
		equal(row.children().length, 4, 'Structure - row child count');
		ok(row.children(':first').is('button.keypad-key:not(.ui-state-default)'),
			'Structure - key button');
		ok(row.children(':last').is('button.keypad-close:not(.ui-state-highlight)'),
			'Structure - close button');
		row = pad.children(':last');
		ok(row.is('div.keypad-row'), 'Structure - row division');
		equal(row.children().length, 2, 'Structure - row child count');
		ok(row.children(':first').is('div.keypad-space'),
			'Structure - space division');
		ok(row.children(':last').is('button.keypad-key:not(.ui-state-default)'),
			'Structure - key button');
		kpd.keypad('hide');
		// Prompt
		kpd = init('#kpd', {prompt: 'Testing'});
		kpd.focus();
		ok(pad.is(':visible'), 'Structure prompt - keypad visible');
		equal(pad.children().length, 5, 'Structure prompt - child count');
		var row = pad.children(':first');
		ok(row.is('div.keypad-prompt:not(.ui-widget-header)'), 'Structure - prompt division');
		kpd.keypad('hide');
		// Keypad class
		kpd = init('#kpd', {keypadClass: 'Testing'});
		kpd.focus();
		ok(pad.is(':visible'), 'Structure keypadClass - keypad visible');
		ok(pad.hasClass('Testing'), 'Structure keypadClass - class');
		kpd.keypad('hide');
		// Inline
		var inl = init('#inl');
		pad = inl.children('.keypad-inline');
		ok(pad.is(':visible'), 'Structure inline - keypad visible');
		ok(!pad.is('.ui-wudget,.ui-widget-content'), 'Structure inline - not UI widget');
		equal(pad.children().length, 4, 'Structure inline - child count');
		var row = pad.children(':first');
		ok(row.is('div.keypad-row'), 'Structure inline - row division');
		equal(row.children().length, 4, 'Structure inline - row child count');
		ok(row.children(':first').is('button.keypad-key:not(.ui-state-default)'),
			'Structure inline - key button');
		ok(row.children(':last').is('button.keypad-close:not(.ui-state-highlight)'),
			'Structure inline - close button');
		row = pad.children(':last');
		ok(row.is('div.keypad-row'), 'Structure inline - row division');
		equal(row.children().length, 2, 'Structure inline - row child count');
		ok(row.children(':first').is('div.keypad-space'),
			'Structure inline - space division');
		ok(row.children(':last').is('button.keypad-key:not(.ui-state-default)'),
			'Structure inline - key button');
	});

	test('ThemeRoller Structure', function() {
		expect(28);
		var pad = $('.keypad-popup');
		var kpd = init('#kpd', {useThemeRoller: true});
		kpd.focus();
		ok(pad.is(':visible'), 'ThemeRoller Structure - keypad visible');
		ok(!pad.hasClass('keypad-rtl'), 'ThemeRoller Structure - not right-to-left');
		ok(pad.is('.ui-widget.ui-widget-content'), 'ThemeRoller Structure - UI widget');
		equal(pad.children().length, 4, 'ThemeRoller Structure - child count');
		var row = pad.children(':first');
		ok(row.is('div.keypad-row'), 'ThemeRoller Structure - row division');
		equal(row.children().length, 4, 'ThemeRoller Structure - row child count');
		ok(row.children(':first').is('button.keypad-key.ui-state-default'),
			'ThemeRoller Structure - key button');
		ok(row.children(':last').is('button.keypad-close.ui-state-highlight'),
			'ThemeRoller Structure - close button');
		row = pad.children(':last');
		ok(row.is('div.keypad-row'), 'ThemeRoller Structure - row division');
		equal(row.children().length, 2, 'ThemeRoller Structure - row child count');
		ok(row.children(':first').is('div.keypad-space'),
			'ThemeRoller Structure - space division');
		ok(row.children(':last').is('button.keypad-key.ui-state-default'),
			'ThemeRoller Structure - key button');
		kpd.keypad('hide');
		// Prompt
		kpd = init('#kpd', {useThemeRoller: true, prompt: 'Testing'});
		kpd.focus();
		ok(pad.is(':visible'), 'ThemeRoller Structure prompt - keypad visible');
		equal(pad.children().length, 5, 'ThemeRoller Structure prompt - child count');
		var row = pad.children(':first');
		ok(row.is('div.keypad-prompt.ui-widget-header'), 'ThemeRoller Structure - prompt division');
		kpd.keypad('hide');
		// Keypad class
		kpd = init('#kpd', {useThemeRoller: true, keypadClass: 'Testing'});
		kpd.focus();
		ok(pad.is(':visible'), 'ThemeRoller Structure keypadClass - keypad visible');
		ok(pad.hasClass('Testing'), 'ThemeRoller Structure keypadClass - class');
		kpd.keypad('hide');
		// Inline
		var inl = init('#inl', {useThemeRoller: true});
		pad = inl.children('.keypad-inline');
		ok(pad.is(':visible'), 'ThemeRoller Structure inline - keypad visible');
		ok(pad.is('.ui-widget.ui-widget-content'), 'ThemeRoller Structure inline - UI widget');
		equal(pad.children().length, 4, 'ThemeRoller Structure inline - child count');
		var row = pad.children(':first');
		ok(row.is('div.keypad-row'), 'ThemeRoller Structure inline - row division');
		equal(row.children().length, 4, 'ThemeRoller Structure inline - row child count');
		ok(row.children(':first').is('button.keypad-key.ui-state-default'),
			'ThemeRoller Structure inline - key button');
		ok(row.children(':last').is('button.keypad-close.ui-state-highlight'),
			'ThemeRoller Structure inline - close button');
		row = pad.children(':last');
		ok(row.is('div.keypad-row'), 'ThemeRoller Structure inline - row division');
		equal(row.children().length, 2, 'ThemeRoller Structure inline - row child count');
		ok(row.children(':first').is('div.keypad-space'),
			'ThemeRoller Structure inline - space division');
		ok(row.children(':last').is('button.keypad-key.ui-state-default'),
			'ThemeRoller Structure inline - key button');
	});

	test('Enable/disable', function() {
		expect(32);
		var kpd = init('#kpd');
		ok(!kpd.keypad('isDisabled'), 'Enable/disable - initially marked as enabled');
		ok(!kpd[0].disabled, 'Enable/disable - field initially enabled');
		kpd.keypad('disable');
		ok(kpd.keypad('isDisabled'), 'Enable/disable - now marked as disabled');
		ok(kpd[0].disabled, 'Enable/disable - field now disabled');
		kpd.keypad('enable');
		ok(!kpd.keypad('isDisabled'), 'Enable/disable - now marked as enabled');
		ok(!kpd[0].disabled, 'Enable/disable - field now enabled');
		// With a button
		kpd = init('#kpd', {showOn: 'button'});
		ok(!kpd.keypad('isDisabled'), 'Enable/disable button - initially marked as enabled');
		ok(!kpd[0].disabled, 'Enable/disable button - field initially enabled');
		ok(!kpd.next('button')[0].disabled, 'Enable/disable button - button initially enabled');
		kpd.keypad('disable');
		ok(kpd.keypad('isDisabled'), 'Enable/disable button - now marked as disabled');
		ok(kpd[0].disabled, 'Enable/disable button - field now disabled');
		ok(kpd.next('button')[0].disabled, 'Enable/disable button - button now disabled');
		kpd.keypad('enable');
		ok(!kpd.keypad('isDisabled'), 'Enable/disable button - now marked as enabled');
		ok(!kpd[0].disabled, 'Enable/disable button - field now enabled');
		ok(!kpd.next('button')[0].disabled, 'Enable/disable button - button now enabled');
		// With an image button
		kpd = init('#kpd', {showOn: 'button', buttonImageOnly: true,
			buttonImage: 'img/calendar.gif'});
		ok(!kpd.keypad('isDisabled'), 'Enable/disable image - initially marked as enabled');
		ok(!kpd[0].disabled, 'Enable/disable image - field initially enabled');
		ok(kpd.next('img').css('opacity') == 1, 'Enable/disable image - image initially enabled');
		kpd.keypad('disable');
		ok(kpd.keypad('isDisabled'), 'Enable/disable image - now marked as disabled');
		ok(kpd[0].disabled, 'Enable/disable image - field now disabled');
		ok(kpd.next('img').css('opacity') != 1, 'Enable/disable image - image now disabled');
		kpd.keypad('enable');
		ok(!kpd.keypad('isDisabled'), 'Enable/disable image - now marked as enabled');
		ok(!kpd[0].disabled, 'Enable/disable image - field now enabled');
		ok(kpd.next('img').css('opacity') == 1, 'Enable/disable image - image now enabled');
		//Preset
		kpd.attr('disabled', true);
		kpd = init('#kpd');
		ok(kpd.keypad('isDisabled'), 'Preset - now marked as disabled');
		ok(kpd[0].disabled, 'Preset - field now disabled');
		kpd.keypad('enable');
		ok(!kpd.keypad('isDisabled'), 'Preset - now marked as enabled');
		ok(!kpd[0].disabled, 'Preset - field now enabled');
		// Inline
		var inl = init('#inl');
		ok(!inl.keypad('isDisabled'), 'Enable/disable inline - initially marked as enabled');
		ok(inl.children('.keypad-disabled').length == 0, 'Enable/disable inline - field initially enabled');
		inl.keypad('disable');
		ok(inl.keypad('isDisabled'), 'Enable/disable inline - now marked as disabled');
		ok(inl.children('.keypad-disabled').length == 1, 'Enable/disable inline - field now disabled');
	});
	
	test('Mouse', function() {
		expect(14);
		var kpd = init('#kpd');
		var pad = $('.keypad-popup');
		kpd.val('').keypad('show');
		$('.keypad-key:contains(1)', pad).click();
		equal(kpd.val(), '1', 'Mouse click 1');
		$('.keypad-key:contains(3)', pad).click();
		equal(kpd.val(), '13', 'Mouse click 3');
		$('.keypad-key:contains(5)', pad).click();
		equal(kpd.val(), '135', 'Mouse click 5');
		$('.keypad-back', pad).click();
		equal(kpd.val(), '13', 'Mouse click back');
		$('.keypad-clear', pad).click();
		equal(kpd.val(), '', 'Mouse click clear');
		ok(pad.is(':visible'), 'Mouse click visible');
		$('.keypad-close', pad).click();
		ok(!pad.is(':visible'), 'Mouse click close');
		// Alphabetic
		kpd = init('#kpd', {layout: ['123' + $.keypad.CLOSE, 'abc' + $.keypad.SHIFT]});
		kpd.val('').keypad('show');
		$('.keypad-key:contains(1)', pad).click();
		equal(kpd.val(), '1', 'Mouse click 1');
		$('.keypad-key:contains(a)', pad).click();
		equal(kpd.val(), '1a', 'Mouse click a');
		$('.keypad-shift', pad).click();
		$('.keypad-key:contains(B)', pad).click();
		equal(kpd.val(), '1aB', 'Mouse click B');
		$('.keypad-shift', pad).click();
		$('.keypad-key:contains(c)', pad).click();
		equal(kpd.val(), '1aBc', 'Mouse click c');
		// Max length
		kpd = init('#kpd');
		kpd.attr('maxlength', 2).val('').keypad('show');
		$('.keypad-key:contains(1)', pad).click();
		equal(kpd.val(), '1', 'Max length click 1');
		$('.keypad-key:contains(3)', pad).click();
		equal(kpd.val(), '13', 'Max length click 3');
		$('.keypad-key:contains(5)', pad).click();
		equal(kpd.val(), '13', 'Max length click 5');
	});

	test('Randomise', function() {
		expect(11)
		var layout = ['12345', 'abcde', '!@#%&'];
		var nonRandom = /^12345abcde!@#%&$/;
		var kpd = init('#kpd', {layout: layout});
		var pad = $('.keypad-popup');
		kpd.keypad('show');
		ok(nonRandom.test(collectKeys(pad)), 'Randomise - none');
		kpd.keypad('hide').keypad('option', {randomiseNumeric: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^[12345]{5}abcde!@#%&$/.test(collectKeys(pad)),
			'Randomise - numeric');
		kpd.keypad('hide').keypad('option', {randomiseNumeric: false,
			randomiseAlphabetic: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^12345[abcde]{5}!@#%&$/.test(collectKeys(pad)),
			'Randomise - alphabetic');
		kpd.keypad('hide').keypad('option', {randomiseAlphabetic: false,
			randomiseOther: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^12345abcde[!@#%&]{5}$/.test(collectKeys(pad)),
			'Randomise - other');
		kpd.keypad('hide').keypad('option', {randomiseAlphabetic: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^12345[abcde]{5}[!@#%&]{5}$/.test(collectKeys(pad)),
			'Randomise - alphabetic/other');
		kpd.keypad('hide').keypad('option', {randomiseNumeric: true,
			randomiseOther: false}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^[12345]{5}[abcde]{5}!@#%&$/.test(collectKeys(pad)),
			'Randomise - numeric/alphabetic');
		kpd.keypad('hide').keypad('option', {randomiseAlphabetic: false,
			randomiseOther: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^[12345]{5}abcde[!@#%&]{5}$/.test(collectKeys(pad)),
			'Randomise - numeric/other');
		kpd.keypad('hide').keypad('option', {randomiseAlphabetic: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && /^[12345]{5}[abcde]{5}[!@#%&]{5}$/.test(collectKeys(pad)),
			'Randomise - numeric/alphabetic/other');
		kpd.keypad('hide').keypad('option', {randomiseAlphabetic: false,
			randomiseNumeric: false, randomiseOther: false}).keypad('show');
		ok(nonRandom.test(collectKeys(pad)), 'Randomise - none');
		kpd.keypad('hide').keypad('option', {randomiseAll: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && !/^12345/.test(collectKeys(pad)) &&
			!/^.{5}abcde/.test(collectKeys(pad)) && !/^.{10}!@#%&$/.test(collectKeys(pad)) &&
			/^[12345abcde!@#%&]{15}$/.test(collectKeys(pad)),
			'Randomise - all');
		kpd.keypad('hide').keypad('option', {randomiseAlphabetic: true}).keypad('show');
		ok(!nonRandom.test(collectKeys(pad)) && !/^12345/.test(collectKeys(pad)) &&
			!/^.{5}abcde/.test(collectKeys(pad)) && !/^.{10}!@#%&$/.test(collectKeys(pad)) &&
			/^[12345abcde!@#%&]{15}$/.test(collectKeys(pad)),
			'Randomise - all/alphabetic');
	});

	test('Separator', function() {
		expect(5);
		var kpd = init('#kpd');
		var pad = $('.keypad-popup');
		kpd.focus();
		equal(pad.find('button').length, 13, 'Separator - default - buttons');
		kpd.keypad('hide').keypad('option', {separator: '|', layout:
			['AA|BB|CC|DD', 'EE|FF|GG|HH']}).keypad('show');
		equal(pad.find('button').length, 8, 'Separator - | - buttons');
		equal(pad.text(), 'AABBCCDDEEFFGGHH', 'Separator - |');
		kpd.keypad('hide').keypad('option', {separator: ',', layout:
			['111,222,333,' + $.keypad.CLOSE, '444,555,666,' + $.keypad.CLEAR,
			'777,888,999,' + $.keypad.BACK]}).keypad('show');
		equal(pad.find('button').length, 12, 'Separator - , - buttons');
		equal(pad.text(), '111222333Close444555666Clear777888999Back', 'Separator - ,');
	});

	test('Target', function() {
		expect(9);
		var inl = init('#inl');
		var inp = $('#kpd');
		var pad = $('.keypad-inline', inl);
		equal(inp.val(), '', 'Target - initial');
		$('.keypad-key:contains(1)', pad).click();
		equal(inp.val(), '', 'Target - 1');
		inl.keypad('option', {target: inp});
		$('.keypad-key:contains(2)', pad).click();
		equal(inp.val(), '2', 'Target - 2');
		$('.keypad-key:contains(3)', pad).click();
		equal(inp.val(), '23', 'Target - 3');
		inl.keypad('option', {target: null});
		$('.keypad-key:contains(4)', pad).click();
		equal(inp.val(), '23', 'Target - 4');
		inl.keypad('option', {target: inp[0]});
		$('.keypad-key:contains(5)', pad).click();
		equal(inp.val(), '235', 'Target - 5');
		inl.keypad('option', {target: null});
		$('.keypad-key:contains(6)', pad).click();
		equal(inp.val(), '235', 'Target - 6');
		inl.keypad('option', {target: '#kpd'});
		$('.keypad-key:contains(7)', pad).click();
		equal(inp.val(), '2357', 'Target - 7');
		inl.keypad('option', {target: null});
		$('.keypad-key:contains(8)', pad).click();
		equal(inp.val(), '2357', 'Target - 8');
	});

	test('Before show', function() {
		expect(5);
		var clicked = false;
		var addButton = function(div, inst) {
			$('<button id="add">Added</button>').appendTo(div).click(function() { clicked = true; });
		};
		var kpd = init('#kpd');
		var pad = $('.keypad-popup');
		kpd.focus();
		equal(pad.find('button').length, 13, 'Before show - default - buttons');
		equal(clicked, false, 'Before show - clicked');
		kpd.keypad('hide').keypad('option', {beforeShow: addButton}).keypad('show');
		equal(pad.find('button').length, 14, 'Before show - addButton - buttons');
		$('#add', pad).click();
		equal(clicked, true, 'Before show - clicked');
		kpd.keypad('hide').keypad('option', {beforeShow: null}).keypad('show');
		equal(pad.find('button').length, 13, 'Before show - null - buttons');
	});

	test('Callbacks', function() {
		expect(35);
		var key = '';
		var value = '';
		var inst = null;
		var reset = function() {
			key = '';
			value = '';
			inst = null;
		};
		var pressed = function(k, v, i) {
			key = k;
			value = v;
			inst = i;
		};
		var closed = function(v, i) {
			value = v;
			inst = i;
		};
		var kpd = init('#kpd');
		var pad = $('.keypad-popup');
		kpd.focus();
		$('.keypad-key:contains(0)', pad).click();
		ok(value == '' && !inst, 'No callback - 0');
		reset();
		$('.keypad-close', pad).click();
		ok(value == '' && !inst, 'No callback - close');
		reset();
		// onKeypress
		kpd = init('#kpd', {onKeypress: pressed});
		kpd.val('').focus();
		$('.keypad-key:contains(3)', pad).click();
		ok(key == '3' && value == '3' && inst, 'OnKeypress - 3');
		reset();
		$('.keypad-key:contains(6)', pad).click();
		ok(key == '6' && value == '36' && inst, 'OnKeypress - 6');
		reset();
		$('.keypad-back', pad).click();
		ok(key == $.keypad.BS && value == '3' && inst, 'OnKeypress - back');
		reset();
		$('.keypad-key:contains(9)', pad).click();
		ok(key == '9' && value == '39' && inst, 'OnKeypress - 9');
		reset();
		$('.keypad-clear', pad).click();
		ok(key == $.keypad.DEL && value == '' && inst, 'OnKeypress - clear');
		reset();
		$('.keypad-key:contains(0)', pad).click();
		ok(key == '0' && value == '0' && inst, 'OnKeypress - 0');
		reset();
		$('.keypad-close', pad).click();
		ok(key == '' && value == '' && !inst, 'OnKeypress - close');
		reset();
		// onClose
		kpd = init('#kpd', {onClose: closed});
		kpd.val('').focus();
		$('.keypad-key:contains(2)', pad).click();
		ok(value == '' && !inst, 'OnClose - 2');
		reset();
		$('.keypad-key:contains(5)', pad).click();
		ok(value == '' && !inst, 'OnClose - 5');
		reset();
		$('.keypad-back', pad).click();
		ok(value == '' && !inst, 'OnClose - back');
		reset();
		$('.keypad-key:contains(8)', pad).click();
		ok(value == '' && !inst, 'OnClose - 8');
		reset();
		$('.keypad-clear', pad).click();
		ok(value == '' && !inst, 'OnClose - clear');
		reset();
		$('.keypad-key:contains(1)', pad).click();
		ok(value == '' && !inst, 'OnClose - 1');
		reset();
		$('.keypad-close', pad).click();
		ok(value == '1' && inst, 'OnClose - close');
		reset();
		kpd.focus();
		$('.keypad-key:contains(6)', pad).click();
		ok(value == '' && !inst, 'OnClose - 6');
		reset();
		kpd.focus();
		$('body').simulate('mousedown', {});
		ok(value == '16' && inst, 'OnClose - external click');
		reset();
		// Inline - onKeypress
		var inl = init('#inl', {onKeypress: pressed});
		pad = inl.children('.keypad-inline');
		$('.keypad-key:contains(3)', pad).click();
		ok(key == '3' && value == '3' && inst, 'OnKeypress inline - 3');
		reset();
		$('.keypad-key:contains(6)', pad).click();
		ok(key == '6' && value == '36' && inst, 'OnKeypress inline - 6');
		reset();
		$('.keypad-back', pad).click();
		ok(key == $.keypad.BS && value == '3' && inst, 'OnKeypress inline - back');
		reset();
		$('.keypad-key:contains(9)', pad).click();
		ok(key == '9' && value == '39' && inst, 'OnKeypress inline - 9');
		reset();
		$('.keypad-clear', pad).click();
		ok(key == $.keypad.DEL && value == '' && inst, 'OnKeypress inline - clear');
		reset();
		$('.keypad-key:contains(0)', pad).click();
		ok(key == '0' && value == '0' && inst, 'OnKeypress inline - 0');
		reset();
		$('.keypad-close', pad).click();
		ok(key == '' && value == '' && !inst, 'OnKeypress inline - close');
		reset();
		// Inline - onClose
		inl = init('#inl', {onClose: closed});
		pad = inl.children('.keypad-inline');
		$('.keypad-key:contains(2)', pad).click();
		ok(value == '' && !inst, 'OnClose inline - 2');
		reset();
		$('.keypad-key:contains(5)', pad).click();
		ok(value == '' && !inst, 'OnClose inline - 5');
		reset();
		$('.keypad-back', pad).click();
		ok(value == '' && !inst, 'OnClose inline - back');
		reset();
		$('.keypad-key:contains(8)', pad).click();
		ok(value == '' && !inst, 'OnClose inline - 8');
		reset();
		$('.keypad-clear', pad).click();
		ok(value == '' && !inst, 'OnClose inline - clear');
		reset();
		$('.keypad-key:contains(1)', pad).click();
		ok(value == '' && !inst, 'OnClose inline - 1');
		reset();
		$('.keypad-close', pad).click();
		ok(value == '1' && inst, 'OnClose - close');
		reset();
		$('.keypad-key:contains(6)', pad).click();
		ok(value == '' && !inst, 'OnClose inline - 6');
		reset();
		$('body').simulate('mousedown', {});
		ok(value == '' && !inst, 'OnClose inline - external click');
		reset();
		$('.keypad-close', pad).click();
		ok(value == '6' && inst, 'OnClose - close');
		reset();
	});

	test('Add key definition', function() {
		expect(18);
		var count = 0;
		$.keypad.addKeyDef('TEST', 'test', function() { count++; });
		var kpd = init('#kpd', {testText: 'Testing', testStatus: 'Status for test',
			layout: ['abc' + $.keypad.TEST]});
		var pad = $('.keypad-popup');
		kpd.focus();
		ok($.keypad.TEST, 'Key definition - variable');
		var test = pad.find('.keypad-test');
		ok(test.length, 'Key definition - present');
		ok(!test.is('.ui-state-highlight'), 'Key definition - highlighted');
		equal(test.text(), 'Testing', 'Key definition - text');
		equal(test.attr('title'), 'Status for test', 'Key definition - status');
		test.click();
		equal(count, 1, 'Key definition - action');
		// ThemeRoller
		$.keypad.addKeyDef('TR', 'tr', function() { count += 5; });
		kpd = init('#kpd', {trText: 'ThRr', trStatus: 'Status for tr',
			layout: ['abc' + $.keypad.TR], useThemeRoller: true});
		var pad = $('.keypad-popup');
		kpd.focus();
		ok($.keypad.TR, 'Key definition - variable');
		var test = pad.find('.keypad-tr');
		ok(test.length, 'Key definition - present');
		ok(test.is('.ui-state-highlight'), 'Key definition - highlighted');
		equal(test.text(), 'ThRr', 'Key definition - text');
		equal(test.attr('title'), 'Status for tr', 'Key definition - status');
		test.click();
		equal(count, 6, 'Key definition - action');
		// ThemeRoller - no highlight
		$.keypad.addKeyDef('NOHI', 'nohi', function() { count += 3; }, true);
		kpd = init('#kpd', {nohiText: 'NoHi', nohiStatus: 'Status for nohi',
			layout: ['abc' + $.keypad.NOHI], useThemeRoller: true});
		var pad = $('.keypad-popup');
		kpd.focus();
		ok($.keypad.NOHI, 'Key definition - variable');
		var test = pad.find('.keypad-nohi');
		ok(test.length, 'Key definition - present');
		ok(!test.is('.ui-state-highlight'), 'Key definition - highlighted');
		equal(test.text(), 'NoHi', 'Key definition - text');
		equal(test.attr('title'), 'Status for nohi', 'Key definition - status');
		test.click();
		equal(count, 9, 'Key definition - action');
	});

	test('Is alphabetic', function() {
		expect(14);
		ok($.keypad.isAlphabetic('a'), 'isAlphabetic a');
		ok($.keypad.isAlphabetic('g'), 'isAlphabetic g');
		ok($.keypad.isAlphabetic('z'), 'isAlphabetic z');
		ok($.keypad.isAlphabetic('A'), 'isAlphabetic A');
		ok($.keypad.isAlphabetic('K'), 'isAlphabetic K');
		ok($.keypad.isAlphabetic('Z'), 'isAlphabetic Z');
		ok(!$.keypad.isAlphabetic('0'), 'isAlphabetic 0');
		ok(!$.keypad.isAlphabetic('7'), 'isAlphabetic 7');
		ok(!$.keypad.isAlphabetic('$'), 'isAlphabetic $');
		ok(!$.keypad.isAlphabetic('*'), 'isAlphabetic *');
		ok(!$.keypad.isAlphabetic(' '), 'isAlphabetic space');
		ok(!$.keypad.isAlphabetic(''), 'isAlphabetic empty');
		ok(!$.keypad.isAlphabetic($.keypad.CLOSE), 'isAlphabetic CLOSE');
		ok(!$.keypad.isAlphabetic($.keypad.SPACE), 'isAlphabetic SPACE');
	});

	test('Is numeric', function() {
		expect(14);
		ok(!$.keypad.isNumeric('a'), 'isNumeric a');
		ok(!$.keypad.isNumeric('g'), 'isNumeric g');
		ok(!$.keypad.isNumeric('z'), 'isNumeric z');
		ok(!$.keypad.isNumeric('A'), 'isNumeric A');
		ok(!$.keypad.isNumeric('Z'), 'isNumeric Z');
		ok($.keypad.isNumeric('0'), 'isNumeric 0');
		ok($.keypad.isNumeric('7'), 'isNumeric 7');
		ok($.keypad.isNumeric('9'), 'isNumeric 9');
		ok(!$.keypad.isNumeric('$'), 'isNumeric $');
		ok(!$.keypad.isNumeric('*'), 'isNumeric *');
		ok(!$.keypad.isNumeric(' '), 'isNumeric space');
		ok(!$.keypad.isNumeric(''), 'isNumeric empty');
		ok(!$.keypad.isNumeric($.keypad.CLOSE), 'isNumeric CLOSE');
		ok(!$.keypad.isNumeric($.keypad.SPACE), 'isNumeric SPACE');
	});

	test('To upper', function() {
		expect(6);
		equal($.keypad.toUpper('A'), 'A', 'To upper - A');
		equal($.keypad.toUpper('a'), 'A', 'To upper - a');
		equal($.keypad.toUpper('0'), '0', 'To upper - 0');
		equal($.keypad.toUpper('$'), '$', 'To upper - $');
		equal($.keypad.toUpper('Ä'), 'Ä', 'To upper - Ä');
		equal($.keypad.toUpper('ä'), 'Ä', 'To upper - ä');
	});

	test('Insert value', function() {
		expect(6);
		var inp = $('#kpd');
		inp.val('abc').focus();
		selectRange(inp, 3, 3);
		$.keypad.insertValue(inp, 'x');
		equal(inp.val(), 'abcx', 'Insert value - end');
		$.keypad.insertValue(inp, '1');
		equal(inp.val(), 'abcx1', 'Insert value - end');
		selectRange(inp, 2, 2);
		$.keypad.insertValue(inp, 'y');
		equal(inp.val(), 'abycx1', 'Insert value - middle');
		$.keypad.insertValue(inp, '2');
		equal(inp.val(), 'aby2cx1', 'Insert value - middle');
		selectRange(inp, 1, 4);
		$.keypad.insertValue(inp, 'z');
		equal(inp.val(), 'azcx1', 'Insert value - replace');
		$.keypad.insertValue(inp, '3');
		equal(inp.val(), 'az3cx1', 'Insert value - replace');
	});
});	

function collectKeys(pad) {
	var keys = '';
	$('button', pad).each(function() {
		keys += this.firstChild.nodeValue;
	});
	return keys;
}

function selectRange(input, start, end) {
	input.focus();
	if (input[0].setSelectionRange) { // Mozilla
		input[0].setSelectionRange(start, end);
	}
	else if (input[0].createTextRange) { // IE
		var range = input[0].createTextRange();
		range.move('character', start);
		range.select();
	}
}
