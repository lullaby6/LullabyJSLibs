const htmiElements = document.querySelectorAll('[htmi]');

htmiElements.forEach(htmiElement => {
	const htmiAttribute = htmiElement.getAttribute('htmi')

	const htmiEvents = htmiAttribute.split(' ')

	for (htmiEvent in htmiEvents) {
		print(htmiEvent)
	}
})